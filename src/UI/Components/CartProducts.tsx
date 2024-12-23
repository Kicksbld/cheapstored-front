import Image from "next/image";
import React from "react";
import { Typographie } from "../Design-System/Typographie";
import { Button } from "../Design-System/Button";
import { HiMinus } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";

const CartProducts = () => {
  return (
    <div className="w-full flex justify-between  bg-light border border-cloud rounded-[10px] p-[20px] items-start ">
      <div className="flex gap-[20px]">
        <div className="w-max h-max">
          <Image src="/img/png/airpod.png" alt="" width={54} height={50} />
        </div>

        <div className="space-y-[10px]">
          <Typographie variant="body-sm" theme="dark" font="ambit">
            Apple Airpods Max
          </Typographie>
          <Typographie
            variant="body-sm"
            theme="grey"
            font="ambit"
            className="underline"
          >
            Retour gratuit sous 3 jours
          </Typographie>
          <Typographie variant="body-sm" theme="grey" font="ambit">
            434,00€
          </Typographie>
          <div className="flex items-center gap-[10px]">
            <div className="w-max rounded-[5px] border border-[#A8F3D0] bg-[#D1FAE5] px-[7px] py-[2px]">
              <Typographie theme="green" font="ambit" variant="body-sm">
                Economisez 115,00€
              </Typographie>
            </div>

            <Typographie
              className="line-through"
              variant="body-sm"
              theme="grey"
              font="ambit"
            >
              549,00€ neuf
            </Typographie>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-[10px]">
        <div className=" w-fit rounded-full flex items-center gap-[15px] px-[15px] py-[5px] border-2 border-cloud border-dashed">
          <HiMinus className="text-black/70 cursor-pointer" size={20} />
          <Typographie font="ambit" weight="semibold" variant="h3">
            1
          </Typographie>
          <AiOutlinePlus className="text-black/70 cursor-pointer" size={20} />
        </div>
        <Button variant="delete" size="small">
          Supprimer
        </Button>
      </div>
    </div>
  );
};

export default CartProducts;
