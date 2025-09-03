import Navbar from '@/components/navbar';
import ImageCarousel from '@/components/ImageCarroucel';
import FeaturedStores from '@/components/FeaturedStores';
import Footer from '@/components/Footer';
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <ImageCarousel />
      <FeaturedStores />
      <Footer />
    </main>
  );
}
