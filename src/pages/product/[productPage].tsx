import Header from "@/UI/Components/Header";
import { Typographie } from "@/UI/Design-System/Typographie";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { FiChevronUp } from "react-icons/fi";
import { useRouter } from "next/router";

const productPage = () => {

  const router = useRouter()
  const { productPage } = router.query; // Récupération de l'id à partir des paramètres dynamiques

  type Product = {
    id: number;
    name: string;
    price: number;
  };

  type Error = {
    message: string;
  };

  const PRODUCT_URL = `/api/productSlug?page=${productPage}`;

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Ne pas exécuter tant que l'id n'est pas défini
    if (!productPage) return;

    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(PRODUCT_URL);
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const data: Product = await res.json();
        setProduct(data);

      } catch (e) {
        setError(e as Error);
      } finally {
        setIsLoading(false); // Terminer le chargement dans tous les cas
      }
    };

    fetchProduct();
  }, [productPage]); // L'effet ne dépend que de l'id

  return (
    <>
     <Header 
        productName={product?.name || ""}
        productPrice={product?.price || 0}
        productId={product?.id || 0}
      />

      <div className="container flex justify-between md:flex-row flex-col gap-4 pt-[50px] ">
        <div className="space-y-[22px] w-full md:max-w-[50%]">
          <div className="flex items-center gap-[10px]">
            <Image
              alt=""
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
            Les caractéristiques du AirPods Max
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
                  optimistic updates. Add-to-cart relies on event bus, enabling
                  instant updates without wrapping the entire app in a context.
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
        <div
          className="product-img aspect-square border border-cloud"
          style={{
            backgroundImage: "url(/img/png/airpodsPng.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </>
  );
};

export default productPage;
