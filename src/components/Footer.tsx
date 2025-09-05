import { Store, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Store className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold">
                Zona<span className="text-blue-400">Compras</span>
              </span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Tu directorio comercial de confianza. Conectamos consumidores con tiendas locales 
              para fortalecer la economía de cada zona.
            </p>
            <div className="flex space-x-4">
              <Link href="/sign-up">
                <Button variant="default">Registrar mi tienda</Button>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Explorar Zonas</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Tiendas Destacadas</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Categorías</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Ayuda</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">info@zonacompras.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">+34 123 456 789</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">España</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 ZonaCompras. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}