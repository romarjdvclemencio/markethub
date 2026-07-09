import { Link } from 'react-router-dom';

const SocialIcon = ({ label, children }) => (
  <a href="#" aria-label={label} className="w-8 h-8 rounded-full bg-gray-700 hover:bg-green-600 flex items-center justify-center text-sm transition-colors">
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-green-500 rounded-lg p-1.5">
                <span className="text-white font-black text-lg leading-none">M</span>
              </div>
              <span className="text-white font-bold text-xl">MarketHub</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">Your one-stop marketplace for everything you need. Shop smarter, live better.</p>
            <div className="flex gap-2">
              <SocialIcon label="Facebook">f</SocialIcon>
              <SocialIcon label="Twitter">𝕏</SocialIcon>
              <SocialIcon label="Instagram">📸</SocialIcon>
              <SocialIcon label="Youtube">▶</SocialIcon>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-3">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              {['Help Center', 'How to Buy', 'Returns & Refunds', 'Contact Us', 'Buyer Protection'].map(item => (
                <li key={item}><a href="#" className="hover:text-green-400 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-white font-semibold mb-3">About MarketHub</h3>
            <ul className="space-y-2 text-sm">
              {['About Us', 'Careers', 'MarketHub Blog', 'Seller Centre', 'Flash Deals', 'Affiliates'].map(item => (
                <li key={item}><a href="#" className="hover:text-green-400 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Payment & Delivery */}
          <div>
            <h3 className="text-white font-semibold mb-3">Payment & Delivery</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400 mb-2">Payment Methods</p>
                <div className="flex flex-wrap gap-2">
                  {['💳 Visa', '💳 GCash', '💰 COD', '🏦 Bank'].map(m => (
                    <span key={m} className="bg-gray-700 text-xs px-2 py-1 rounded">{m}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2">Logistics</p>
                <div className="flex flex-wrap gap-2">
                  {['🚚 SPX', '📦 LBC', '🏃 Lalamove'].map(m => (
                    <span key={m} className="bg-gray-700 text-xs px-2 py-1 rounded">{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">
          <p>© 2024 MarketHub. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-green-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
