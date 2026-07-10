import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useAdminData() {
  const [data, setData] = useState({
    users: [],
    orders: [],
    sellers: [],
    events: [],
    products: [],
    loading: true,
  });

  const fetchAll = async () => {
    setData(d => ({ ...d, loading: true }));

    const [profilesRes, ordersRes, eventsRes, productsRes] = await Promise.all([
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
      supabase.from('events').select('*').order('start_date'),
      supabase.from('products').select('*').order('sold', { ascending: false }),
    ]);

    setData({
      users: (profilesRes.data || []).map(p => ({
        id: p.id,
        name: p.name || 'Unknown',
        email: p.email || '—',
        phone: p.phone || '—',
        role: p.role || 'buyer',
        status: 'active',
        joined: p.created_at?.slice(0, 10),
        location: p.location || '—',
        avatar: (p.name || 'U')[0].toUpperCase(),
        orders: 0,
        totalSpent: 0,
      })),
      orders: (ordersRes.data || []).map(o => ({
        id: o.id.slice(0, 9).toUpperCase(),
        customer: o.customer_name || '—',
        product: o.product_name || '—',
        quantity: o.quantity,
        total: Number(o.total),
        status: o.status,
        date: o.created_at?.slice(0, 10),
        payment: o.payment_method || '—',
        address: o.address || '—',
      })),
      sellers: [],
      events: (eventsRes.data || []).map(e => ({
        id: e.id,
        name: e.name,
        description: e.description,
        type: e.type,
        status: e.status,
        discount: e.discount_label,
        startDate: e.start_date,
        endDate: e.end_date,
        participants: e.participants,
      })),
      products: (productsRes.data || []).map(p => ({
        id: p.id,
        name: p.name,
        price: Number(p.price),
        originalPrice: Number(p.original_price),
        image: p.image,
        category: p.category,
        stock: p.stock,
        sold: p.sold,
        rating: Number(p.rating),
        reviews: p.reviews,
        discount: p.discount,
        isFlashDeal: p.is_flash_deal,
        seller: p.seller_name,
        location: p.location,
      })),
      loading: false,
    });
  };

  useEffect(() => {
    fetchAll();

    const channel = supabase
      .channel('admin-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetchAll)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, fetchAll)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'events' }, fetchAll)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, fetchAll)
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    await supabase.from('orders').update({ status }).eq('id', orderId);
  };

  const deleteEvent = async (eventId) => {
    await supabase.from('events').delete().eq('id', eventId);
    fetchAll();
  };

  const createEvent = async (eventData) => {
    await supabase.from('events').insert([eventData]);
    fetchAll();
  };

  return { ...data, updateOrderStatus, deleteEvent, createEvent, refetch: fetchAll };
}
