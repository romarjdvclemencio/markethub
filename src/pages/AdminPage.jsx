import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Users, ShoppingBag, Package, CalendarDays,
  TrendingUp, Bell, Settings, LogOut, Search, ChevronDown,
  MoreVertical, Eye, Trash2, Edit, X, Check, AlertTriangle,
  ArrowUpRight, ArrowDownRight, Star, MapPin, Filter
} from 'lucide-react';
import { useAdminData } from '../hooks/useAdminData';

// ─── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, trend, color }) {
  const positive = trend >= 0;
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex items-start gap-4">
      <div className={`${color} p-3 rounded-xl`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-black text-gray-800 mt-0.5">{value}</p>
        <div className="flex items-center gap-1 mt-1">
          {positive
            ? <ArrowUpRight size={14} className="text-green-500" />
            : <ArrowDownRight size={14} className="text-red-500" />}
          <span className={`text-xs font-medium ${positive ? 'text-green-600' : 'text-red-500'}`}>{Math.abs(trend)}%</span>
          <span className="text-xs text-gray-400">{sub}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Mini Bar Chart ──────────────────────────────────────────────────────────
function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.sales));
  return (
    <div className="flex items-end gap-2 h-32 mt-2">
      {data.map((d) => (
        <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-xs text-gray-400 hidden sm:block">₱{(d.sales/1000).toFixed(0)}k</span>
          <div className="w-full rounded-t-md bg-green-100 hover:bg-green-400 transition-colors relative group cursor-pointer"
            style={{ height: `${(d.sales / max) * 100}%`, minHeight: '4px' }}>
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
              {d.orders} orders
            </div>
          </div>
          <span className="text-xs text-gray-500 font-medium">{d.month}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Category Donut (CSS only) ───────────────────────────────────────────────
function CategoryList({ data }) {
  const colors = ['bg-green-500','bg-blue-500','bg-yellow-500','bg-pink-500','bg-purple-500','bg-gray-400'];
  return (
    <div className="space-y-3 mt-2">
      {data.map((cat, i) => (
        <div key={cat.name}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-700 font-medium">{cat.name}</span>
            <span className="text-gray-500">₱{(cat.sales/1000).toFixed(0)}k · {cat.percentage}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${colors[i]}`} style={{ width: `${cat.percentage}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Status Badge ────────────────────────────────────────────────────────────
function Badge({ status }) {
  const styles = {
    active:     'bg-green-100 text-green-700',
    inactive:   'bg-gray-100 text-gray-500',
    suspended:  'bg-red-100 text-red-600',
    delivered:  'bg-green-100 text-green-700',
    shipped:    'bg-blue-100 text-blue-700',
    processing: 'bg-yellow-100 text-yellow-700',
    cancelled:  'bg-red-100 text-red-500',
    upcoming:   'bg-blue-100 text-blue-700',
    ended:      'bg-gray-100 text-gray-500',
    buyer:      'bg-indigo-100 text-indigo-700',
    seller:     'bg-orange-100 text-orange-700',
    sale:       'bg-red-100 text-red-600',
    flash:      'bg-orange-100 text-orange-600',
    campaign:   'bg-purple-100 text-purple-600',
    promo:      'bg-teal-100 text-teal-600',
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
}

// ─── Dashboard Overview Tab ──────────────────────────────────────────────────
function DashboardTab({ users, orders, products, events }) {
  const totalRevenue = orders.filter(o => o.status === 'delivered').reduce((s, o) => s + o.total, 0);
  const totalOrders = orders.length;
  const totalUsers = users.length;
  const totalProducts = products.length;

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<TrendingUp size={22} className="text-green-600" />} label="Total Revenue" value={`₱${totalRevenue.toLocaleString('en',{minimumFractionDigits:2})}`} sub="from delivered orders" trend={0} color="bg-green-50" />
        <StatCard icon={<ShoppingBag size={22} className="text-blue-600" />} label="Total Orders" value={totalOrders} sub="all time" trend={0} color="bg-blue-50" />
        <StatCard icon={<Users size={22} className="text-purple-600" />} label="Total Users" value={totalUsers} sub="registered" trend={0} color="bg-purple-50" />
        <StatCard icon={<Package size={22} className="text-orange-600" />} label="Products Listed" value={totalProducts} sub="in catalog" trend={0} color="bg-orange-50" />
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h3 className="font-bold text-gray-800 mb-4">Recent Orders</h3>
        {orders.length === 0 ? (
          <div className="py-12 text-center text-gray-400">
            <ShoppingBag size={36} className="mx-auto mb-2 opacity-30" />
            <p>No orders yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b text-xs uppercase">
                  <th className="pb-2 pr-4">Order ID</th>
                  <th className="pb-2 pr-4">Customer</th>
                  <th className="pb-2 pr-4">Product</th>
                  <th className="pb-2 pr-4">Total</th>
                  <th className="pb-2 pr-4">Status</th>
                  <th className="pb-2">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.slice(0, 6).map(order => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="py-2.5 pr-4 font-mono text-xs text-gray-500">{order.id}</td>
                    <td className="py-2.5 pr-4 font-medium text-gray-800">{order.customer}</td>
                    <td className="py-2.5 pr-4 text-gray-600 max-w-[160px] truncate">{order.product}</td>
                    <td className="py-2.5 pr-4 font-semibold text-green-600">₱{order.total.toFixed(2)}</td>
                    <td className="py-2.5 pr-4"><Badge status={order.status} /></td>
                    <td className="py-2.5 text-gray-400 text-xs">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Top products */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h3 className="font-bold text-gray-800 mb-4">Top Selling Products</h3>
        {products.length === 0 ? (
          <div className="py-12 text-center text-gray-400">
            <Package size={36} className="mx-auto mb-2 opacity-30" />
            <p>No products yet — add products from the Products tab</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {products.sort((a,b) => b.sold - a.sold).slice(0,6).map(p => (
              <div key={p.id} className="flex gap-3 items-center p-3 border rounded-lg hover:border-green-300 transition-colors">
                <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-gray-100" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.sold?.toLocaleString()} sold · ₱{p.price}</p>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    <Star size={10} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-500">{p.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Users Tab ───────────────────────────────────────────────────────────────
function UsersTab({ users }) {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    const matchStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-5 border-b flex flex-wrap gap-3 items-center justify-between">
        <h3 className="font-bold text-gray-800 text-lg">All Users ({filtered.length})</h3>
        <div className="flex gap-2 flex-wrap">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search name or email..."
              className="border rounded-lg pl-8 pr-3 py-2 text-sm outline-none focus:border-green-500 w-52" />
          </div>
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500">
            <option value="all">All Roles</option>
            <option value="buyer">Buyers</option>
            <option value="seller">Sellers</option>
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 text-xs uppercase bg-gray-50">
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3">Contact</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Location</th>
              <th className="px-5 py-3">Orders</th>
              <th className="px-5 py-3">Total Spent</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Joined</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {user.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-gray-500 text-xs">{user.phone}</td>
                <td className="px-5 py-3"><Badge status={user.role} /></td>
                <td className="px-5 py-3">
                  <span className="flex items-center gap-1 text-gray-500 text-xs"><MapPin size={11} />{user.location}</span>
                </td>
                <td className="px-5 py-3 text-center font-medium">{user.orders}</td>
                <td className="px-5 py-3 font-semibold text-green-600">₱{user.totalSpent.toLocaleString()}</td>
                <td className="px-5 py-3"><Badge status={user.status} /></td>
                <td className="px-5 py-3 text-gray-400 text-xs">{user.joined}</td>
                <td className="px-5 py-3">
                  <div className="flex gap-1">
                    <button className="p-1.5 hover:bg-blue-50 rounded text-blue-500" title="View"><Eye size={14} /></button>
                    <button className="p-1.5 hover:bg-yellow-50 rounded text-yellow-500" title="Edit"><Edit size={14} /></button>
                    <button className="p-1.5 hover:bg-red-50 rounded text-red-400" title="Delete"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-gray-400">No users found</div>
        )}
      </div>
    </div>
  );
}

// ─── Products Tab ────────────────────────────────────────────────────────────
function ProductsTab({ products }) {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const cats = [...new Set(products.map(p => p.category))];

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.seller.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === 'all' || p.category === catFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-5 border-b flex flex-wrap gap-3 items-center justify-between">
        <h3 className="font-bold text-gray-800 text-lg">All Products ({filtered.length})</h3>
        <div className="flex gap-2 flex-wrap">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search product or seller..."
              className="border rounded-lg pl-8 pr-3 py-2 text-sm outline-none focus:border-green-500 w-52" />
          </div>
          <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500">
            <option value="all">All Categories</option>
            {cats.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 text-xs uppercase bg-gray-50">
              <th className="px-5 py-3">Product</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Seller</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Stock</th>
              <th className="px-5 py-3">Sold</th>
              <th className="px-5 py-3">Rating</th>
              <th className="px-5 py-3">Flash</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800 max-w-[180px] truncate">{p.name}</p>
                      <p className="text-xs text-gray-400">ID: {p.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3"><Badge status={p.category.toLowerCase().replace(/ /g,'')} /><span className="text-xs text-gray-600 ml-1">{p.category}</span></td>
                <td className="px-5 py-3 text-gray-600 text-xs">{p.seller}</td>
                <td className="px-5 py-3">
                  <p className="font-bold text-green-600">₱{p.price}</p>
                  <p className="text-xs text-gray-400 line-through">₱{p.originalPrice}</p>
                </td>
                <td className="px-5 py-3">
                  <span className={`font-medium ${p.stock < 100 ? 'text-red-500' : 'text-gray-700'}`}>{p.stock}</span>
                </td>
                <td className="px-5 py-3 font-medium">{p.sold.toLocaleString()}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-700">{p.rating}</span>
                    <span className="text-xs text-gray-400">({p.reviews})</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  {p.isFlashDeal
                    ? <span className="text-orange-500 font-bold text-xs">⚡ YES</span>
                    : <span className="text-gray-300 text-xs">—</span>}
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-1">
                    <button className="p-1.5 hover:bg-blue-50 rounded text-blue-500"><Eye size={14} /></button>
                    <button className="p-1.5 hover:bg-yellow-50 rounded text-yellow-500"><Edit size={14} /></button>
                    <button className="p-1.5 hover:bg-red-50 rounded text-red-400"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Orders Tab ──────────────────────────────────────────────────────────────
function OrdersTab({ orders }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = orders.filter(o => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = filtered.filter(o => o.status === 'delivered').reduce((s,o) => s + o.total, 0);

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Orders', value: orders.length, color: 'text-gray-800' },
          { label: 'Delivered', value: orders.filter(o=>o.status==='delivered').length, color: 'text-green-600' },
          { label: 'Processing', value: orders.filter(o=>o.status==='processing').length, color: 'text-yellow-600' },
          { label: 'Cancelled', value: orders.filter(o=>o.status==='cancelled').length, color: 'text-red-500' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl shadow-sm p-4 text-center">
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-5 border-b flex flex-wrap gap-3 items-center justify-between">
          <h3 className="font-bold text-gray-800 text-lg">All Orders</h3>
          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search order, customer..."
                className="border rounded-lg pl-8 pr-3 py-2 text-sm outline-none focus:border-green-500 w-52" />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500">
              <option value="all">All Status</option>
              <option value="delivered">Delivered</option>
              <option value="shipped">Shipped</option>
              <option value="processing">Processing</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 text-xs uppercase bg-gray-50">
                <th className="px-5 py-3">Order ID</th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">Qty</th>
                <th className="px-5 py-3">Total</th>
                <th className="px-5 py-3">Payment</th>
                <th className="px-5 py-3">Address</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(o => (
                <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs text-gray-500 font-medium">{o.id}</td>
                  <td className="px-5 py-3 font-medium text-gray-800">{o.customer}</td>
                  <td className="px-5 py-3 text-gray-600 max-w-[160px] truncate">{o.product}</td>
                  <td className="px-5 py-3 text-center">{o.quantity}</td>
                  <td className="px-5 py-3 font-bold text-green-600">₱{o.total.toFixed(2)}</td>
                  <td className="px-5 py-3 text-gray-500 text-xs">{o.payment}</td>
                  <td className="px-5 py-3 text-gray-500 text-xs">{o.address}</td>
                  <td className="px-5 py-3"><Badge status={o.status} /></td>
                  <td className="px-5 py-3 text-gray-400 text-xs">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="py-12 text-center text-gray-400">No orders found</div>}
        </div>
        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t bg-gray-50 text-sm text-right">
            <span className="text-gray-500">Revenue from delivered orders: </span>
            <span className="font-bold text-green-600">₱{totalRevenue.toFixed(2)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sellers Tab ─────────────────────────────────────────────────────────────
function SellersTab({ sellers }) {
  const [search, setSearch] = useState('');
  const filtered = sellers.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.owner.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-5 border-b flex flex-wrap gap-3 items-center justify-between">
        <h3 className="font-bold text-gray-800 text-lg">Sellers ({filtered.length})</h3>
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search store or owner..."
            className="border rounded-lg pl-8 pr-3 py-2 text-sm outline-none focus:border-green-500 w-52" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 text-xs uppercase bg-gray-50">
              <th className="px-5 py-3">Store</th>
              <th className="px-5 py-3">Owner</th>
              <th className="px-5 py-3">Location</th>
              <th className="px-5 py-3">Products</th>
              <th className="px-5 py-3">Total Sales</th>
              <th className="px-5 py-3">Revenue</th>
              <th className="px-5 py-3">Rating</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Joined</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(s => (
              <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3">
                  <div>
                    <p className="font-semibold text-gray-800">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.email}</p>
                  </div>
                </td>
                <td className="px-5 py-3 text-gray-600">{s.owner}</td>
                <td className="px-5 py-3">
                  <span className="flex items-center gap-1 text-gray-500 text-xs"><MapPin size={11} />{s.location}</span>
                </td>
                <td className="px-5 py-3 text-center font-medium">{s.products}</td>
                <td className="px-5 py-3 font-medium">{s.sales.toLocaleString()}</td>
                <td className="px-5 py-3 font-bold text-green-600">₱{(s.revenue/1000).toFixed(1)}k</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span>{s.rating}</span>
                  </div>
                </td>
                <td className="px-5 py-3"><Badge status={s.status} /></td>
                <td className="px-5 py-3 text-gray-400 text-xs">{s.joined}</td>
                <td className="px-5 py-3">
                  <div className="flex gap-1">
                    <button className="p-1.5 hover:bg-blue-50 rounded text-blue-500"><Eye size={14} /></button>
                    <button className="p-1.5 hover:bg-yellow-50 rounded text-yellow-500"><Edit size={14} /></button>
                    <button className="p-1.5 hover:bg-red-50 rounded text-red-400"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Events Tab ──────────────────────────────────────────────────────────────
function EventsTab({ events, adminData }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-gray-800 text-lg">Campaigns & Events</h3>
        <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition-colors font-medium">
          + New Event
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map(ev => (
          <div key={ev.id} className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Badge status={ev.type} />
                <Badge status={ev.status} />
              </div>
              <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button>
            </div>
            <h4 className="font-bold text-gray-800 text-base mb-1">{ev.name}</h4>
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">{ev.description}</p>
            <div className="space-y-1.5 text-xs text-gray-500">
              <div className="flex justify-between">
                <span>📅 Duration</span>
                <span className="font-medium text-gray-700">{ev.startDate} → {ev.endDate}</span>
              </div>
              <div className="flex justify-between">
                <span>🏷️ Discount</span>
                <span className="font-bold text-red-500">{ev.discount}</span>
              </div>
              <div className="flex justify-between">
                <span>🏪 Participants</span>
                <span className="font-medium text-gray-700">{ev.participants} sellers</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 text-xs border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
                <Edit size={12} /> Edit
              </button>
              <button className="flex-1 text-xs border border-red-200 text-red-500 rounded-lg py-2 hover:bg-red-50 transition-colors flex items-center justify-center gap-1">
                <Trash2 size={12} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Sales Analytics Tab ─────────────────────────────────────────────────────
function SalesTab({ orders }) {
  const totalRevenue = orders.filter(o => o.status === 'delivered').reduce((s,o) => s + o.total, 0);
  const avgOrder = totalRevenue / orders.filter(o => o.status === 'delivered').length;

  return (
    <div className="space-y-4">
      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Gross Revenue', value: `₱${totalRevenue.toFixed(2)}`, note: 'Delivered orders only' },
          { label: 'Avg Order Value', value: `₱${avgOrder.toFixed(2)}`, note: 'Per delivered order' },
          { label: 'Conversion Rate', value: '3.8%', note: 'Visits to orders' },
          { label: 'Return Rate', value: '1.2%', note: 'Of total orders' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl shadow-sm p-5">
            <p className="text-sm text-gray-500">{k.label}</p>
            <p className="text-2xl font-black text-gray-800 mt-1">{k.value}</p>
            <p className="text-xs text-gray-400 mt-1">{k.note}</p>
          </div>
        ))}
      </div>

      {/* Monthly chart */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h3 className="font-bold text-gray-800 mb-1">Monthly Revenue Trend</h3>
        <p className="text-sm text-gray-400 mb-4">January – July 2024</p>
        <BarChart data={monthlySales} />
        <div className="grid grid-cols-7 gap-2 mt-4">
          {monthlySales.map(m => (
            <div key={m.month} className="text-center">
              <p className="text-xs font-bold text-gray-700">₱{(m.sales/1000).toFixed(0)}k</p>
              <p className="text-xs text-gray-400">{m.orders} orders</p>
            </div>
          ))}
        </div>
      </div>

      {/* Category breakdown */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-4">Revenue by Category</h3>
          <CategoryList data={categoryStats} />
        </div>

        {/* Payment methods */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-4">Payment Methods</h3>
          <div className="space-y-3">
            {[
              { method: 'GCash', count: orders.filter(o=>o.payment==='GCash').length, color: 'bg-blue-500' },
              { method: 'COD', count: orders.filter(o=>o.payment==='COD').length, color: 'bg-yellow-500' },
              { method: 'Visa', count: orders.filter(o=>o.payment==='Visa').length, color: 'bg-indigo-500' },
              { method: 'Bank Transfer', count: orders.filter(o=>o.payment==='Bank').length, color: 'bg-gray-400' },
            ].map(pm => (
              <div key={pm.method}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{pm.method}</span>
                  <span className="text-gray-500">{pm.count} orders · {Math.round(pm.count/orders.length*100)}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${pm.color}`}
                    style={{ width: `${Math.round(pm.count/orders.length*100)}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Order status breakdown */}
          <h3 className="font-bold text-gray-800 mt-6 mb-4">Order Status Breakdown</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Delivered', count: orders.filter(o=>o.status==='delivered').length, color: 'bg-green-50 text-green-700 border-green-200' },
              { label: 'Shipped', count: orders.filter(o=>o.status==='shipped').length, color: 'bg-blue-50 text-blue-700 border-blue-200' },
              { label: 'Processing', count: orders.filter(o=>o.status==='processing').length, color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
              { label: 'Cancelled', count: orders.filter(o=>o.status==='cancelled').length, color: 'bg-red-50 text-red-600 border-red-200' },
            ].map(s => (
              <div key={s.label} className={`border rounded-lg p-3 ${s.color}`}>
                <p className="text-xl font-black">{s.count}</p>
                <p className="text-xs font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Layout ───────────────────────────────────────────────────────
const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'users',     label: 'Users',     icon: Users },
  { key: 'products',  label: 'Products',  icon: Package },
  { key: 'orders',    label: 'Orders',    icon: ShoppingBag },
  { key: 'sellers',   label: 'Sellers',   icon: TrendingUp },
  { key: 'events',    label: 'Events',    icon: CalendarDays },
  { key: 'sales',     label: 'Sales',     icon: TrendingUp },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const adminData = useAdminData();
  const { users, orders, sellers, events, products, loading } = adminData;

  const notifications = [
    { msg: 'New order ORD-012 placed by Diego Mendoza', time: '2m ago', unread: true },
    { msg: 'Seller "HomePlus Store" was flagged for review', time: '15m ago', unread: true },
    { msg: 'Flash Deal Friday starts in 30 minutes', time: '30m ago', unread: true },
    { msg: 'User Ana Lim cancelled order ORD-006', time: '1h ago', unread: false },
    { msg: 'Monthly revenue report is ready', time: '3h ago', unread: false },
  ];

  const renderContent = () => {
    if (loading) return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-500 text-sm">Loading live data...</p>
        </div>
      </div>
    );
    switch (activeTab) {
      case 'dashboard': return <DashboardTab users={users} orders={orders} products={products} events={events} />;
      case 'users':     return <UsersTab users={users} />;
      case 'products':  return <ProductsTab products={products} />;
      case 'orders':    return <OrdersTab orders={orders} />;
      case 'sellers':   return <SellersTab sellers={sellers} />;
      case 'events':    return <EventsTab events={events} adminData={adminData} />;
      case 'sales':     return <SalesTab orders={orders} />;
      default:          return <DashboardTab users={users} orders={orders} products={products} events={events} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-56' : 'w-16'} bg-gray-900 text-white flex flex-col transition-all duration-200 flex-shrink-0`}>
        {/* Logo */}
        <div className="p-4 flex items-center gap-3 border-b border-gray-700">
          <div className="bg-green-500 rounded-lg p-1.5 flex-shrink-0">
            <span className="text-white font-black text-base leading-none">M</span>
          </div>
          {sidebarOpen && <span className="font-bold text-lg">Admin</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  activeTab === item.key
                    ? 'bg-green-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon size={18} className="flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-gray-700 p-4 space-y-1">
          <button className="w-full flex items-center gap-3 text-gray-400 hover:text-white text-sm py-2 px-1 transition-colors">
            <Settings size={17} className="flex-shrink-0" />
            {sidebarOpen && <span>Settings</span>}
          </button>
          <Link to="/" className="w-full flex items-center gap-3 text-gray-400 hover:text-red-400 text-sm py-2 px-1 transition-colors">
            <LogOut size={17} className="flex-shrink-0" />
            {sidebarOpen && <span>Exit Admin</span>}
          </Link>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b px-5 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(s => !s)} className="text-gray-400 hover:text-gray-700 transition-colors">
              <LayoutDashboard size={20} />
            </button>
            <h1 className="font-bold text-gray-800 capitalize">{activeTab}</h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setNotifOpen(o => !o)} className="relative text-gray-500 hover:text-gray-800 transition-colors p-1">
                <Bell size={20} />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">3</span>
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-9 w-80 bg-white rounded-xl shadow-xl border z-50">
                  <div className="flex items-center justify-between px-4 py-3 border-b">
                    <p className="font-semibold text-sm">Notifications</p>
                    <button onClick={() => setNotifOpen(false)}><X size={14} className="text-gray-400" /></button>
                  </div>
                  <div className="divide-y max-h-72 overflow-y-auto">
                    {notifications.map((n, i) => (
                      <div key={i} className={`px-4 py-3 text-sm hover:bg-gray-50 flex gap-2 ${n.unread ? 'bg-green-50' : ''}`}>
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.unread ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <div>
                          <p className="text-gray-700">{n.msg}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Admin avatar */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">A</div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-800 leading-none">Admin</p>
                <p className="text-xs text-gray-400">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-5">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
