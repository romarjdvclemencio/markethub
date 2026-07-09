import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

export default function ProductCard({ product }) {
  const formatPrice = (price) => `₱${price.toFixed(2)}`;
  const formatSold = (sold) => sold >= 1000 ? `${(sold / 1000).toFixed(1)}k` : sold;

  return (
    <Link to={`/product/${product.id}`} className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
            -{product.discount}%
          </span>
        )}
        {product.isFlashDeal && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
            ⚡ FLASH
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-sm text-gray-800 line-clamp-2 font-medium leading-snug mb-1">
          {product.name}
        </p>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-green-600 font-bold text-base">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-gray-400 text-xs line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-0.5">
            <Star size={11} className="fill-yellow-400 text-yellow-400" />
            <span>{product.rating}</span>
          </div>
          <span>{formatSold(product.sold)} sold</span>
        </div>
        {product.location && (
          <p className="text-xs text-gray-400 mt-1 truncate">{product.location}</p>
        )}
      </div>
    </Link>
  );
}
