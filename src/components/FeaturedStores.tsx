"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StoreCard from "./StoreCard";
import { Store } from "@/types/store";

export default function FeaturedStores() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    let mounted = true;
    async function loadApproved() {
      try {
        const res = await fetch("/api/store?status=approved");
        if (!res.ok) return;
        const data = await res.json();
        if (!mounted || !Array.isArray(data)) return;

        // Map server fields to front-end Store shape
        const mapped: Store[] = data.map((s: any) => ({
          id: s.id,
          name: s.name,
          categories: s.categories ?? [],
          // DB stores 'zona' — map to 'zone' used by UI
          zone: s.zona ?? s.zone ?? "N/D",
          logo: s.logo ?? "/placeholder.svg",
          website: s.website ?? "",
          description: s.description ?? "",
          isFeatured: !!s.is_featured || !!s.isFeatured,
          rating: s.rating ?? 0,
        }));

        setStores(mapped);
      } catch (err) {
        // keep empty on error
        console.error("Failed to load approved stores", err);
      }
    }

    loadApproved();
    return () => {
      mounted = false;
    };
  }, []);

  const scrollByWidth = (direction: "left" | "right") => {
    const el = sliderRef.current;
    if (!el) return;
    const offset = el.offsetWidth * 0.9; // scroll almost one view
    el.scrollBy({
      left: direction === "right" ? offset : -offset,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 bg-white relative">
      <div className="w-full px-2 sm:px-4 lg:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tiendas Destacadas
          </h2>
        </div>

        <div className="relative">
          {/* Prev button */}
          <button
            aria-label="Anterior"
            onClick={() => scrollByWidth("left")}
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
            {stores
              .filter((s) => s.isFeatured)
              .slice(0, 6)
              .map((store) => (
                <div
                  key={store.id}
                  role="listitem"
                  className="snap-start"
                  style={{ minWidth: "660px" }}
                >
                  <StoreCard store={store} />
                </div>
              ))}
          </div>

          {/* Next button */}
          <button
            aria-label="Siguiente"
            onClick={() => scrollByWidth("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-md hover:bg-gray-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center mt-8">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Ver Todas las Tiendas
          </button>
        </div>
      </div>
    </section>
  );
}
