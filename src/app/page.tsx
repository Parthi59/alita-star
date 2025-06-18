'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { supabase } from './lib/supabaseClient';
import ProductCard from '../components/ui/ProductCard';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: number;
  created_at: string;
}

const LIMIT = 10;

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [wishlistItems, setWishlistItems] = useState<{ [key: string]: boolean }>({});
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .range(page * LIMIT, page * LIMIT + LIMIT - 1);

    if (error) {
      console.error('Error fetching products:', error.message);
      return;
    }

    if (data.length < LIMIT) setHasMore(false);
    setProducts((prev) => [...prev, ...data]);
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const loaderRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const toggleWishlist = (title: string) => {
    setWishlistItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-sky-100 px-4 pt-4">
      {/* Header */}
      <h1 className="text-center text-2xl font-bold mb-4">ALITA STAR 🏬</h1>

      {/* Search Bar */}
      <div className="text-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 rounded-md w-11/12 md:w-1/2 shadow border border-gray-300"
        />
      </div>

      {/* Product Layout (horizontal flex-wrap) */}
      <div className="flex flex-wrap justify-center gap-4">
        {filtered.map((product) => (
 <ProductCard
  key={product.id}
  title={product.title}
  price={product.price}
  image={product.image}
  rating={product.rating}
  isWishlisted={wishlistItems[product.title] || false}
  onAddToCart={() => {}}
  onToggleWishlist={() => toggleWishlist(product.title)}
/>

        ))}
      </div>

      {/* Infinite Scroll Loader */}
      <div ref={loaderRef} className="text-center py-6 text-sm text-gray-700">
        {loading ? '🔄 Loading more products...' : hasMore ? '⬇️ Scroll down for more' : '✅ No more products to show'}
      </div>

      {/* Footer */}
      <footer className="p-4 bg-sky-200 text-sm text-center">
        <p>💖 Wishlist ({Object.keys(wishlistItems).filter((k) => wishlistItems[k]).length}) items</p>
        <p>🛒 Cart (0 items)</p>
        <p>🧾 Total: ₹0.00</p>
      </footer>
    </div>
  );
}








