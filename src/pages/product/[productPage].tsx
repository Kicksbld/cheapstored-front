import Header from "@/UI/Components/Header";
import { Typographie } from "@/UI/Design-System/Typographie";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { FiChevronUp } from "react-icons/fi";
import { useRouter } from "next/router";
import Loader from "@/UI/Components/Loader";

const ProductPage = () => {
  const router = useRouter();
  const { productPage } = router.query;

  type Image = {
    id: number; // Identifiant unique de l'image
    src: string; // URL de l'image
  };

  type Product = {
    id: number;
    name: string;
    quantity: number;
    price: number;
    images: Image[]; // Tableau d'images
  };

  const PRODUCT_URL = `/api/productSlug?page=${productPage}`;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!productPage) return; // Attendre que `productPage` soit défini

    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(PRODUCT_URL);

        if (!res.ok) {
          console.error(`Produit non trouvé pour la page : ${productPage}`);
          router.replace("/404");
          return;
        }

        const data: Product = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du produit :", error);
        router.replace("/404");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productPage, router]);

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return null; // Évite le rendu si le produit n'est pas défini
  }

  return (
    <>
      <Header
        productName={product.name}
        productPrice={product.price}
        productQuantity={product.quantity}
        productImages={
          product.images && product.images.length > 0
            ? product.images
            : [
                {
                  id: 8,
                  src: "/img/png/defaultImg.png",
                },
              ]
        }
      />
      <div className="container flex justify-between md:flex-row flex-col gap-4 pt-[50px]">
        <div className="space-y-[22px] w-full md:max-w-[50%]">
          <div className="flex items-center gap-[10px]">
            <Image
              alt="Livraison gratuite"
              src="/img/svg/flying-box.svg"
              width={15}
              height={15}
            />
            <Typographie
              variant="body-sm"
              font="ambit"
              theme="secondary"
              weight="bold"
            >
              Livraison gratuite
            </Typographie>
          </div>
          <Typographie variant="h2">
            Les caractéristiques : {product.name}
          </Typographie>
          <div className="space-y-[15px]">
            <div className="border-cloud border bg-light rounded-[10px] p-[20px] flex gap-[20px]">
              <FiChevronUp size={15} className="text-grey" />
              <div className="space-y-[15px]">
                <Typographie
                  variant="tag-title"
                  weight="semibold"
                  font="ambit"
                  theme="grey"
                >
                  Informations du produit
                </Typographie>
                <Typographie
                  font="ambit"
                  className="max-w-[480px]"
                  theme="grey"
                >
                  Instant page load and navigation with React’s streaming and
                  optimistic updates.
                </Typographie>
              </div>
            </div>
            <div className="border-cloud border bg-light rounded-[10px] p-[20px] flex gap-[20px]">
              <IoChevronDownSharp size={15} className="text-grey" />
              <div className="space-y-[15px]">
                <Typographie
                  variant="tag-title"
                  weight="semibold"
                  font="ambit"
                  theme="grey"
                >
                  Informations du produit
                </Typographie>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            {product?.images?.length > 0 ? (
              product.images.map((item) => (
                <div
                  key={item.id}
                  className="product-img aspect-square border border-cloud"
                  style={{
                    backgroundImage: `url(${item.src})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                  }}
                ></div>
              ))
            ) : (
              <Typographie font="ambit" theme="secondary">
                Aucune image disponible
              </Typographie>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
