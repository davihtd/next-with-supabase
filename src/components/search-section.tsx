"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchSection() {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">¿Qué estás buscando?</h2>
          <p className="text-muted-foreground text-lg text-balance">Encuentra productos y servicios en tu zona</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Buscar productos..." className="pl-10 h-12 text-base" />
          </div>
          <Button className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground">Buscar</Button>
        </div>
      </div>
    </section>
  )
}
