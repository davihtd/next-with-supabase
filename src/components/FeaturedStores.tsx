"use client";

import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StoreCard from './StoreCard';
import { Store } from '@/types/store';

const placeholderStores: Store[] = [
  {
    id: '1',
    name: 'Panadería San Miguel',
    categories: ['Alimentación', 'Hogar'],
    zone: 'Centro',
    logo: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg',
    website: 'https://example.com',
    description: 'Pan artesanal y productos de repostería',
    isFeatured: true,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Farmacia Verde',
    categories: ['Salud', 'Belleza'],
    zone: 'Norte',
    logo: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg',
    website: 'https://example.com',
    description: 'Medicamentos y productos de cuidado personal',
    isFeatured: true,
    rating: 4.9,
  },
  {
    id: '3',
    name: 'Librería El Saber',
    categories: ['Educación', 'Moda'],
    zone: 'Sur',
    logo: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
    website: 'https://example.com',
    description: 'Libros, material escolar y papelería',
    isFeatured: true,
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Restaurante Luna',
    categories: ['Restaurantes'],
    zone: 'Este',
    logo: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg',
    website: 'https://example.com',
    description: 'Cocina tradicional y comida casera',
    isFeatured: true,
    rating: 4.6,
  },
  {
    id: '5',
    name: 'Tecnología Plus',
    categories: ['Tecnología', 'Hogar'],
    zone: 'Oeste',
    logo: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
    website: 'https://example.com',
    description: 'Equipos electrónicos y reparaciones',
    isFeatured: true,
    rating: 4.5,
  },
  {
    id: '6',
    name: 'Moda Bella',
    categories: ['Moda', 'Belleza'],
    zone: 'Centro',
    logo: 'https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg',
    website: 'https://example.com',
    description: 'Ropa y accesorios de moda',
    isFeatured: true,
    rating: 4.4,
  },
];

export default function FeaturedStores() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [stores, setStores] = useState<Store[]>(placeholderStores);

  useEffect(() => {
    let mounted = true;
    async function loadApproved() {
      try {
        const res = await fetch('/api/store?status=approved');
        if (!res.ok) return;
        const data = await res.json();
        if (!mounted || !Array.isArray(data)) return;

        // Map server fields to front-end Store shape
        const mapped: Store[] = data.map((s: any) => ({
          id: s.id,
          name: s.name,
          categories: s.categories ?? [],
          // DB stores 'zona' — map to 'zone' used by UI
          zone: s.zona ?? s.zone ?? 'N/D',
          logo: s.logo ?? '/placeholder.svg',
          website: s.website ?? '',
          description: s.description ?? '',
          isFeatured: !!s.is_featured || !!s.isFeatured,
          rating: s.rating ?? 0,
        }));

        if (mapped.length > 0) setStores(mapped);
      } catch (err) {
        // keep placeholders on error
        console.error('Failed to load approved stores', err);
      }
    }

    loadApproved();
    return () => {
      mounted = false;
    };
  }, []);

  const scrollByWidth = (direction: 'left' | 'right') => {
    const el = sliderRef.current;
    if (!el) return;
    const offset = el.offsetWidth * 0.9; // scroll almost one view
    el.scrollBy({ left: direction === 'right' ? offset : -offset, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-white relative">
      <div className="w-full px-2 sm:px-4 lg:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tiendas Destacadas</h2>
        </div>

        <div className="relative">
          {/* Prev button */}
          <button
            aria-label="Anterior"
            onClick={() => scrollByWidth('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-md hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Slider */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-4 px-6"
            role="list"
          >
            {(stores.filter((s) => s.isFeatured).slice(0, 6).length > 0
              ? stores.filter((s) => s.isFeatured).slice(0, 6)
              : placeholderStores.slice(0, 6)
            ).map((store) => (
              <div key={store.id} role="listitem" className="snap-start" style={{ minWidth: '660px' }}>
                <StoreCard store={store} />
              </div>
            ))}
          </div>

          {/* Next button */}
          <button
            aria-label="Siguiente"
            onClick={() => scrollByWidth('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-md hover:bg-gray-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center mt-8">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Ver Todas las Tiendas</button>
        </div>
      </div>
    </section>
  );
}