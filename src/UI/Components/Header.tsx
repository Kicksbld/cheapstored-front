import React, { useState } from "react";
import NavBar from "@/UI/Components/navigation/NavBar";
import { Button } from "@/UI/Design-System/Button";
import { Typographie } from "@/UI/Design-System/Typographie";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
import { HiMinus } from "react-icons/hi";
import { RiArrowRightSFill } from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Counter from "../Design-System/Counter";

interface Product {
  productId: number;
  productName: string;
  productPrice: number;
  productQuantity: number;
  productImages: ImageType[];
  productShortDescription: string;
}

type ImageType = {
  id: number; // Identifiant unique de l'image
  src: string; // URL de l'image
};

const Header = ({
  productId,
  productName,
  productPrice,
  productQuantity,
  productImages,
  productShortDescription,
}: Product) => {
  const [quantity, setQuantity] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(productImages[0]?.id);
  const pathname = usePathname();
  const router = useRouter();

  const handleAddToCart = () => {
    let cartStorage = [];
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const existingCart = localStorage.getItem("cart");
      if (existingCart) {
        cartStorage = JSON.parse(existingCart);
      }
      cartStorage.push({
        productId,
        productName,
        productPrice,
        quantity,
        productQuantity,
        productImages,
      });
      localStorage.setItem("cart", JSON.stringify(cartStorage));
    } else {
      console.log("localStorage is not available");
    }
    productQuantity = productQuantity - quantity;
  };

  const handleImageClick = (id: number) => {
    setSelectedImageId(id);
  };

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
    setTimeout(() => {
      setIsPopupOpen(false);
    }, 3000);
  };

  return (
    <div className="bg-[#F3EFE6] w-full">
      <div className="container h-full relative">
        {isPopupOpen && (
          <div className="fixed z-[500] right-10 top-20 bg-light border-2 border-cloud rounded-[4px] py-[10px] px-[15px] flex items-center flex-col gap-[12px] animate-popup ">
            <div className="flex items-center gap-2">
              <Typographie variant="h3" font="ambit" theme="modify">
                * {quantity}
              </Typographie>
              <Typographie variant="h3" font="cooper">
                Article Ajouté au Panier
              </Typographie>
            </div>
            <Button
              onClick={() => router.push("/userpages/Cart")}
              variant="filled"
              size="small"
              className="w-max"
            >
              Consulter
            </Button>
          </div>
        )}
        <div className="absolute right-1/2  z-[200] top-[130px] md:right-0 md:top-1/2 flex md:flex-col flex-row cursor-pointer transform md:-translate-y-2/3 md:translate-x-0 translate-x-1/2  items-center gap-4">
          {productImages.map((item) => (
            <div
              key={item.id}
              className={`${
                selectedImageId === item.id
                  ? "boxEffect"
                  : "boxEffectNotSelected"
              } rounded-[4px] cursor-pointer overflow-hidden md:w-[128px] md:h-[88px] w-[90px] h-[55px] relative`}
              onClick={() => handleImageClick(item.id)} // Gérer le clic
            >
              <Image
                src={item.src}
                alt=""
                fill
                className="object-cover hover:scale-110 transition-all duration-200 ease-in-out"
              />
            </div>
          ))}
        </div>
        <div className="container overflow-x-hidden flex flex-col min-h-screen space-y-8 w-full justify-between items-center">
          <div className="w-full">
            <NavBar />
            {pathname !== "/" && (
              <div className="flex items-center gap-1 mt-[30px] cursor-pointer">
                <Link href="/">
                  <Typographie variant="body-xs" theme="grey" font="ambit">
                    Accueil
                  </Typographie>
                </Link>

                <RiArrowRightSFill size={15} className="text-grey" />
                <Typographie variant="body-xs" theme="grey" font="ambit">
                  {productName}
                </Typographie>
              </div>
            )}
          </div>
          <div className="relative">
            {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-4">
              <Typographie
                variant="display"
                font="tungsten"
                theme="light"
                className="header-text-stroke uppercase w-max"
              >
                {productName}
              </Typographie>
            </div> */}
            <div className="relative z-10 imgHeader">
              <Image
                key={selectedImageId} // Met à jour l'image principale
                src={
                  productImages.find((img) => img.id === selectedImageId)
                    ?.src || ""
                }
                alt=""
                width={592}
                height={555}
              />
            </div>
          </div>
          <div className="flex items-center justify-between flex-col md:flex-row gap-8 w-full pb-[52px]">
            <div className="space-y-[10px] w-full">
              {productQuantity < 1 ? (
                <Typographie
                  variant="h3"
                  theme="error"
                  font="ambit"
                  weight="semibold"
                  className="uppercase"
                >
                  • Stock Indisponible •
                </Typographie>
              ) : (
                <Typographie
                  variant="h3"
                  theme="green"
                  font="ambit"
                  weight="semibold"
                  className="uppercase"
                >
                  • Stock disponible •
                </Typographie>
              )}
              <Typographie
                variant="h1"
                font="cooper"
                className="uppercase max-w-[400px]"
              >
                {productName}
              </Typographie>
            </div>
            <div className="space-y-[15px] w-full flex flex-col md:items-end">
              <Typographie
                variant="h3"
                font="ambit"
                className="md:text-end sm:text-center max-w-[400px]"
              >
                {productShortDescription}
              </Typographie>
              <div className="flex flex-wrap items-center gap-[15px] md:w-max">
                <div className="w-fit rounded-full flex items-center gap-[15px] px-[15px] py-[5px] border-2 border-black border-dashed select-none">
                  <HiMinus
                    className="text-black/70 cursor-pointer hover:text-red transition-all duration-200 ease-in-out"
                    size={20}
                    onClick={() =>
                      quantity > 1 ? setQuantity(quantity - 1) : null
                    }
                  />
                  <Typographie
                    className="w-[20px] text-center flex items-center justify-center"
                    font="ambit"
                    weight="semibold"
                    variant="h3"
                  >
                    <Counter
                      value={quantity}
                      places={[1]}
                      fontSize={18}
                      padding={5}
                      gap={10}
                      textColor="black"
                      fontWeight={500}
                    />
                  </Typographie>
                  <AiOutlinePlus
                    onClick={() =>
                      quantity < productQuantity
                        ? setQuantity(quantity + 1)
                        : null
                    }
                    className={
                      quantity < productQuantity
                        ? "text-black/70 cursor-pointer hover:text-green transition-all duration-200 ease-in-out"
                        : "opacity-35 cursor-not-allowed"
                    }
                    size={20}
                  />
                </div>

                <Button
                  className={productQuantity < 1 ? "cursor-not-allowed" : ""}
                  onClick={() => {
                    if (productQuantity > 0) {
                      handleAddToCart();
                      handlePopupOpen();
                    }
                  }}
                  disabled={productQuantity < 1}
                >
                  Ajouter au panier - {productPrice} €
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
