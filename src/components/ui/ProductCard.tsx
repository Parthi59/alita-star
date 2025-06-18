'use client';

import { FcRating } from 'react-icons/fc';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  rating: number;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onAddToCart: () => void;
}

export default function ProductCard({
  title,
  price,
  image,
  rating,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="max-w-xs bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform hover:scale-105">
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />

      {/* Info Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-gray-800 font-medium">₹{price}</p>

          {/* Rating */}
          <div className="flex items-center mt-2">
            {Array.from({ length: 5 }, (_, i) => (
              <FcRating
                key={i}
                className={`text-xl ${i < rating ? 'opacity-100' : 'opacity-30'}`}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={onAddToCart}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            Add to Cart
          </button>
          <button
            onClick={onToggleWishlist}
            className="text-xl text-pink-500"
          >
            {isWishlisted ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>
    </div>
  );
}







