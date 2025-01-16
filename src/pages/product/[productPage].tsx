import Header from "@/UI/Components/Header";
import { Typographie } from "@/UI/Design-System/Typographie";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { FiChevronUp } from "react-icons/fi";
import { useRouter } from "next/router";

const ProductPage = () => {
  const router = useRouter();
  const { productPage } = router.query; // Récupération de l'id à partir des paramètres dynamiques

  type Product = {
    id: number;
    name: string;
    quantity: number;
    price: number;
  };

  const PRODUCT_URL = `/api/productSlug?page=${productPage}`;

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
          // Si le produit n'est pas trouvé, redirige vers la page 404
          router.replace("/404");
          return;
        }

        const data: Product = await res.json();
        setProduct(data);
      } catch (e) {
        console.error("Erreur lors de la récupération du produit :", e);
        router.replace("/404"); // Redirige en cas d'erreur
      } finally {
        setIsLoading(false); // Terminer le chargement dans tous les cas
      }
    };

    fetchProduct();
  }, [productPage, router]); // L'effet dépend de l'id et du routeur

  if (isLoading) {
    return (
      <div className="bg-[#F3EFE6] w-full min-h-screen grid place-content-center">
        <div className="flex gap-4 items-center px-4 py-2  rounded-md border-tercery">
          <Typographie font="ambit" theme="tercery">
            Chargement En cours
          </Typographie>
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-tercery animate-spin fill-primary"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null; // Évite un rendu inutile si la redirection a lieu
  }

  return (
    <>
      <Header
        productName={product.name || ""}
        productPrice={product.price || 0}
        productQuantity={product.quantity || 0}
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

export default ProductPage;
