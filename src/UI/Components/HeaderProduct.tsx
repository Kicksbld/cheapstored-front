import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useRouter } from "next/router";
import Loader from "./Loader";

const HeaderProduct = () => {
  const router = useRouter();

  type Product = {
    id: number;
    name: string;
    quantity: number;
    price: number;
    headerItem?: boolean; // Ajout de cette clé optionnelle
    images: Image[];
  };

  type Image = {
    id: number; // Identifiant unique de l'image
    src: string;
  };

  const PRODUCT_URL = `/api/products`;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [headerProduct, setHeaderProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(PRODUCT_URL);

        if (!res.ok) {
          router.replace("/404");
          return;
        }

        const data: Product[] = await res.json(); // On attend un tableau ici

        // Trouve le premier produit avec headerItem: true
        const productWithHeader = data.find((item) => item.headerItem === true);

        if (productWithHeader) {
          setHeaderProduct(productWithHeader);
        } else {
          console.warn("Aucun produit avec headerItem: true trouvé.");
        }
      } catch (e) {
        console.error("Erreur lors de la récupération des produits :", e);
        router.replace("/404");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [router]);

  if (isLoading) {
    return <Loader />;
  }

  if (!headerProduct) {
    return null; // Évite un rendu inutile si aucun produit n'est trouvé
  }

  // Passe le produit au Header
  return (
    <Header
      productName={headerProduct.name || ""}
      productPrice={headerProduct.price || 0}
      productQuantity={headerProduct.quantity || 0}
      productImages={headerProduct.images}
    />
  );
};

export default HeaderProduct;
