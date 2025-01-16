import React, { useState } from "react";
import NavBar from "@/UI/Components/navigation/NavBar";
import { Button } from "@/UI/Design-System/Button";
import { Typographie } from "@/UI/Design-System/Typographie";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
import { HiMinus } from "react-icons/hi";
import { RiArrowRightSFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Product {
  productName: string;
  productPrice: number;
}

const Header = ({ productName, productPrice }: Product) => {
  const [quantity, setQuantity] = useState(1);
  const pathname = usePathname();

  const handleAddToCart = () => {
    let cartStorage = [];
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const existingCart = localStorage.getItem("cart");
      if (existingCart) {
        cartStorage = JSON.parse(existingCart);
      }
      cartStorage.push({ productName, productPrice, quantity: quantity });
      localStorage.setItem("cart", JSON.stringify(cartStorage));
    } else {
      console.log("localStorage is not available");
    }
  };

  return (
    <div className="bg-[#F3EFE6] w-full">
      <div className="container h-full relative">
        <div className="absolute right-0 top-1/2 md:flex hidden cursor-pointer transform -translate-y-2/3 flex-col items-center gap-4">
          <div className="w-fit h-fit boxEffect rounded-[4px] cursor-pointer">
            <Image
              src="/img/png/airpodsBox.png"
              alt=""
              width={128}
              height={88}
            />
          </div>
          <div className="w-fit h-fit boxEffectNotSelected rounded-[4px]">
            <Image
              src="/img/png/airpodsBox.png"
              alt=""
              width={128}
              height={88}
            />
          </div>
          <div className="w-fit h-fit boxEffectNotSelected rounded-[4px]">
            <Image
              src="/img/png/airpodsBox.png"
              alt=""
              width={128}
              height={88}
            />
          </div>
        </div>
        <div className="container flex flex-col min-h-screen space-y-8 w-full justify-between items-center">
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
                <RiArrowRightSFill size={15} className="text-grey" />
              </div>
            )}
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-4">
              <Typographie
                variant="display"
                font="tungsten"
                theme="light"
                className=" header-text-stroke"
              >
                AIRPODS
              </Typographie>
            </div>
            <div className="relative z-10">
              <Image
                src="/img/png/airpodsPng.png"
                alt=""
                width={592}
                height={555}
              />
            </div>
          </div>
          <div className="flex items-center justify-between flex-col md:flex-row gap-8 w-full pb-[52px]">
            <div className="space-y-[10px] w-full  ">
              <Typographie
                variant="h3"
                theme="green"
                font="ambit"
                weight="semibold"
                className="uppercase"
              >
                • Stock disponible •
              </Typographie>
              <Typographie
                variant="h1"
                font="cooper"
                className="uppercase max-w-[400px]"
              >
                {productName}
              </Typographie>
            </div>
            <div className="flex flex-col items-center gap-[20px] w-full">
              <div className="flex items-center gap-[10px] cursor-pointer">
                <div className="p-[5px] bg-white w-fit rounded-full border border-grey">
                  <Image
                    alt=""
                    src="/img/png/color.png"
                    width={30}
                    height={30}
                  />
                </div>
                <div className="p-[5px]  w-fit rounded-full  ">
                  <Image
                    alt=""
                    src="/img/png/color.png"
                    width={30}
                    height={30}
                  />
                </div>
                <div className="p-[5px]  w-fit rounded-full  ">
                  <Image
                    alt=""
                    src="/img/png/color.png"
                    width={30}
                    height={30}
                  />
                </div>
              </div>
              <Typographie
                variant="body-base"
                className="text-black/50"
                font="ambit"
              >
                Couleur: Mauve
              </Typographie>
            </div>

            <div className="space-y-[15px] w-full flex flex-col md:items-end items-center ">
              <Typographie
                variant="h3"
                font="ambit"
                className="md:text-end text-center max-w-[400px]"
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem sum.
              </Typographie>
              <div className="flex flex-wrap items-center gap-[15px] md:w-max">
                <div className=" w-fit rounded-full flex items-center gap-[15px] px-[15px] py-[5px] border-2 border-black border-dashed">
                  <HiMinus
                    className="text-black/70 cursor-pointer"
                    size={20}
                    onClick={() =>
                      quantity > 1 ? setQuantity(quantity - 1) : ""
                    }
                  />
                  <Typographie font="ambit" weight="semibold" variant="h3">
                    {quantity}
                  </Typographie>
                  <AiOutlinePlus
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-black/70 cursor-pointer"
                    size={20}
                  />
                </div>

                <Button onClick={() => handleAddToCart()}>
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
