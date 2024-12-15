import Header from "@/UI/Components/Header";
import { Typographie } from "@/UI/Design-System/Typographie";
import Image from "next/image";
import React from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { FiChevronUp } from "react-icons/fi";

const productPage = () => {
  return (
    <>
      <Header />
      <div className="container flex justify-between pt-[50px] ">
        <div className="space-y-[22px]  ">
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
        <div className="w-[910px] h-[640px] border border-cloud" style={{backgroundImage: "url(/img/png/airpodsPng.png)", backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center"}}>
          
        </div>
      </div>
    </>
  );
};

export default productPage;
