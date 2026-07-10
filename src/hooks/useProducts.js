import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('sold', { ascending: false });

    if (error) {
      console.error('Failed to load products:', error.message);
      setError(error.message);
      setProducts([]);
    } else {
      setProducts((data || []).map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
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
      })));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();

    // Real-time: update instantly when products change in DB
    const channel = supabase
      .channel('products-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, fetchProducts)
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  return { products, loading, error };
}
