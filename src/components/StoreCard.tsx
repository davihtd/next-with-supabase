'use client';

import Link from 'next/link';
import { Store } from '@/types/store';
import { Star, ExternalLink } from 'lucide-react';
import { getCategoryIcon } from '@/utils/categoryIcons';

interface StoreCardProps {
  store: Store;
}

export default function StoreCard({ store }: StoreCardProps) {
  return (
    <Link
      href={`/store/${store.id}`}
      className="block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100 w-full"
    >
      <div className="flex items-stretch">
        {/* Left: logo */}
  <div className="w-72 h-72 flex-shrink-0 bg-gray-50 relative">
          <img
            src={store.logo || '/placeholder.svg'}
            alt={`${store.name} logo`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: info */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{store.name}</h3>
                <p className="text-sm text-gray-600">Zona {store.zone}</p>
              </div>
              {store.isFeatured && (
                <div className="ml-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  Destacada
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center gap-2 flex-wrap">
              {store.categories?.map((cat, idx) => {
                const CatIcon = getCategoryIcon(cat);
                return (
                  <div key={idx} className="flex items-center gap-2 bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                    <CatIcon className="w-4 h-4 text-blue-600" />
                    <span className="sr-only">{cat}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {store.website && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(store.website, '_blank', 'noopener,noreferrer');
                  }}
                  className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
                  aria-label={`Abrir sitio de ${store.name}`}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">Visitar sitio</span>
                </button>
              )}
            </div>
            <span className="text-blue-600 font-medium">Ver tienda →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}