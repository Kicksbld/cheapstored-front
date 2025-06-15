import React, { useEffect, useState } from "react";
import { Typographie } from "../Design-System/Typographie";
import Image from "next/image";
import Link from "next/link";

// Définition des types
type Category = {
  name: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  category: Category; // Catégorie modifiée pour être un objet avec 'name'
  images: Image[];
};

type Image = {
  id: number; // Identifiant unique de l'image
  url: string; // URL de l'image
  src: string; // Texte alternatif pour l'image
};

type Error = {
  message: string;
};

interface ProductCardsProps {
  nameFilter?: string;
  chosenCat: string;
}

const ProductCards: React.FC<ProductCardsProps> = ({
  chosenCat,
  nameFilter,
}) => {
  const PRODUCT_URL = "/api/products";

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(PRODUCT_URL);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Product[] = await res.json();
        setProducts(data); // Stockage de tous les produits
        setFilteredProducts(data); // Filtrage initial
      } catch (e) {
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (nameFilter) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [nameFilter, products]);

  // Filtrer les produits lorsque chosenCat change
  useEffect(() => {
    console.log(products);
    if (chosenCat === "all") {
      setFilteredProducts(products); // Si 'all', montre tous les produits
    } else {
      const filtered = products.filter(
        (product) => product.category.name === chosenCat // Vérifie si la catégorie correspond
      );
      setFilteredProducts(filtered);
    }
  }, [chosenCat, products]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div> Loading...</div>;
  }

  return (
    <>
      {filteredProducts.map((product) => (
        <Link
          className="w-full"
          href={`/product/${product.id}`}
          key={product.id}
        >
          <div className="flex flex-col justify-center p-[20px] cursor-pointer group bg-light gap-[20px] w-full rounded-[10px] border border-cloud">
            <div className="w-full aspect-square relative">
              <Image
                key={product.images?.[0]?.id || `default-${product.id}`}
                src={product.images?.[0]?.src || "/img/png/defaultImg.png"}
                alt={product.images?.[0]?.src || "Image par défaut"}
                fill
                className="object-cover group-hover:scale-105 transition-all duration-200 ease-in-out"
              />
            </div>

            <div className="space-y-[20px]">
              <div className="space-y-[6px]">
                {/* <Typographie
                  font="ambit"
                  weight="bold"
                  theme="secondary"
                  variant="body-xs"
                >
                  Livraison gratuite
                </Typographie> */}
                <Typographie
                  font="ambit"
                  weight="semibold"
                  theme="secondary"
                  variant="body-sm"
                  className="w-full text-center"
                >
                  {product.name}
                </Typographie>
              </div>
              <hr className="border-cloud" />
              <div>
                <Typographie
                  font="ambit"
                  className="text-black/60"
                  variant="body-sm"
                >
                  À partir
                </Typographie>
                <Typographie
                  font="ambit"
                  weight="semibold"
                  theme="dark"
                  variant="body-xs"
                >
                  {product.price} €
                </Typographie>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default ProductCards;
