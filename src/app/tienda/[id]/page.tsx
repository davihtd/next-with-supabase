import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Star, ExternalLink, MapPin, Globe, Phone, Mail } from 'lucide-react';
import { Store } from '@/types/store';
import { getCategoryIcon } from '@/utils/categoryIcons';






interface StorePageProps {
  params: {
    id: string;
  };
}

export default async function StorePage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const store = await fetchStore(id);
  if (!store) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al inicio
          </Link>
        </div>
      </div>

      {/* Store Profile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Hero Section */}
          <div className="relative h-64 bg-gradient-to-r from-blue-600 to-blue-800">
            <div className="absolute inset-0 bg-black bg-opacity-20" />
            {store.isFeatured && (
              <div className="absolute top-6 right-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <Star className="w-4 h-4" />
                Tienda Destacada
              </div>
            )}
          </div>

          {/* Store Info */}
          <div className="relative px-8 pb-8">
            {/* Logo */}
            <div className="absolute -top-16 left-8">
              <div className="w-32 h-32 bg-white rounded-2xl shadow-lg p-4 flex items-center justify-center">
                <img
                  src={store.logo}
                  alt={`${store.name} logo`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            {/* Content */}
            <div className="pt-20">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                {/* Left Column - Main Info */}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{store.name}</h1>
                  
                  {/* Zone and Rating */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-5 h-5" />
                      <span>Zona {store.zone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(store.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({store.rating})</span>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Categorías</h3>
                    <div className="flex flex-wrap gap-3">
                      {store.categories?.map((category, index) => {
                        const CategoryIcon = getCategoryIcon(category);
                        return (
                          <div
                            key={index}
                            className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-200"
                          >
                            <CategoryIcon className="w-5 h-5" />
                            <span className="font-medium">{category}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Acerca de nosotros</h3>
                    <p className="text-gray-600 leading-relaxed">{store.description}</p>
                  </div>
                </div>

                {/* Right Column - Actions */}
                <div className="lg:w-80">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contacto y Enlaces</h3>
                    
                    <div className="space-y-4">
                      {/* Website */}
                      {store.website && (
                        <a
                          href={store.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Globe className="w-5 h-5" />
                          <span className="font-medium">Visitar sitio web</span>
                          <ExternalLink className="w-4 h-4 ml-auto" />
                        </a>
                      )}

                      {/* Products Link */}
                      <button className="flex items-center gap-3 w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors">
                        <Star className="w-5 h-5" />
                        <span className="font-medium">Ver productos</span>
                      </button>

                      {/* Contact Info */}
                      <div className="pt-4 border-t border-gray-200">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-gray-600">
                            <Phone className="w-5 h-5" />
                            <span>+34 123 456 789</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-600">
                            <Mail className="w-5 h-5" />
                            <span>contacto@{store.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Store Hours */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Horarios de atención</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Lunes - Viernes</span>
                <span className="font-medium">9:00 - 20:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sábados</span>
                <span className="font-medium">9:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Domingos</span>
                <span className="font-medium">Cerrado</span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ubicación</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium">Zona {store.zone}</p>
                  <p className="text-gray-600 text-sm">Calle Principal 123, Local 45</p>
                </div>
              </div>
              <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Ver en el mapa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function fetchStore(id: string): Promise<Store | null> {
  try {
    // Prefer NEXT_PUBLIC_BASE_URL, fallback to localhost for dev
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const url = `${baseUrl}/api/store/${id}`;
    const res = await fetch(url, {
      cache: 'no-store',
    });
    const data = await res.json();
    if (!res.ok || !data || data.error) return null;
    // Map DB fields to Store type
    return {
      id: data.id,
      name: data.name,
      categories: data.categories ?? [],
      zone: data.zona ?? data.zone ?? 'N/D',
      logo: data.logo ?? '/placeholder.svg',
      website: data.website ?? '',
      description: data.description ?? '',
      isFeatured: !!data.is_featured || !!data.isFeatured,
      rating: data.rating ?? 0,
    };
  } catch {
    return null;
  }
}