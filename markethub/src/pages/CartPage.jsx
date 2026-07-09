import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ChevronRight, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [checked, setChecked] = useState(() => new Set(items.map(i => i.id)));
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const toggleCheck = (id) => {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (checked.size === items.length) {
      setChecked(new Set());
    } else {
      setChecked(new Set(items.map(i => i.id)));
    }
  };

  const selectedItems = items.filter(i => checked.has(i.id));
  const subtotal = selectedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal >= 500 ? 0 : subtotal > 0 ? 60 : 0;
  const total = subtotal - discount + shipping;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'SAVE10') {
      setCouponApplied(true);
    } else {
      alert('Invalid coupon code. Try SAVE10');
    }
  };

  const handleCheckout = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h2>
        <p className="text-gray-500 mb-6">Thank you for shopping at MarketHub. Your order is being processed.</p>
        <Link to="/" className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <ShoppingBag size={64} className="text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-600 mb-2">Your cart is empty</h2>
        <p className="text-gray-400 mb-6">Add products to your cart to see them here</p>
        <Link to="/" className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-green-600">Home</Link>
        <ChevronRight size={14} />
        <span className="text-gray-800 font-medium">Shopping Cart</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-3">
          {/* Select all */}
          <div className="bg-white rounded-xl shadow-sm px-4 py-3 flex items-center gap-3">
            <input
              type="checkbox"
              checked={checked.size === items.length && items.length > 0}
              onChange={toggleAll}
              className="w-4 h-4 accent-green-600 cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-700">
              Select All ({items.length} {items.length === 1 ? 'item' : 'items'})
            </span>
            <button
              onClick={() => {
                const checkedIds = [...checked];
                checkedIds.forEach(id => removeFromCart(id));
                setChecked(new Set());
              }}
              className="ml-auto text-sm text-red-500 hover:underline"
            >
              Delete Selected
            </button>
          </div>

          {/* Items */}
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  checked={checked.has(item.id)}
                  onChange={() => toggleCheck(item.id)}
                  className="w-4 h-4 accent-green-600 cursor-pointer mt-1 flex-shrink-0"
                />
                <Link to={`/product/${item.id}`} className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} className="text-sm font-medium text-gray-800 hover:text-green-600 line-clamp-2 block mb-1">
                    {item.name}
                  </Link>
                  <p className="text-xs text-gray-400 mb-2">{item.seller}</p>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-green-600 font-bold">₱{item.price.toFixed(2)}</span>
                    <div className="flex items-center gap-1">
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 hover:bg-gray-100 text-gray-600 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 py-1 text-sm border-x min-w-[2.5rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 hover:bg-gray-100 text-gray-600 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Subtotal: <span className="font-medium text-gray-700">₱{(item.price * item.quantity).toFixed(2)}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="space-y-3">
          {/* Coupon */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Tag size={16} className="text-green-600" />
              <h3 className="font-semibold text-sm">Promo Code</h3>
            </div>
            {couponApplied ? (
              <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 rounded-lg px-3 py-2">
                <span>✓ SAVE10 applied — 10% off!</span>
                <button onClick={() => setCouponApplied(false)} className="ml-auto text-gray-400 hover:text-red-500">
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code (try SAVE10)"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500"
                />
                <button
                  onClick={applyCoupon}
                  className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-xl shadow-sm p-4 sticky top-24">
            <h3 className="font-bold text-gray-800 mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({selectedItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span>₱{subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount (SAVE10)</span>
                  <span>-₱{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>{shipping === 0 ? 'FREE' : `₱${shipping.toFixed(2)}`}</span>
              </div>
              {subtotal > 0 && subtotal < 500 && (
                <p className="text-xs text-green-600 bg-green-50 rounded p-2">
                  Add ₱{(500 - subtotal).toFixed(2)} more for free shipping!
                </p>
              )}
              <div className="border-t pt-3 flex justify-between font-bold text-base text-gray-800">
                <span>Total</span>
                <span className="text-green-600">₱{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={selectedItems.length === 0}
              className="w-full mt-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold text-sm transition-colors"
            >
              Checkout ({selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'})
            </button>

            <Link to="/" className="block text-center mt-3 text-green-600 text-sm hover:underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
