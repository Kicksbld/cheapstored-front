import React from "react";
import NavBar from "@/UI/Components/navigation/NavBar";
import { Button } from "@/UI/Design-System/Button";
import { Typographie } from "@/UI/Design-System/Typographie";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
import { HiMinus } from "react-icons/hi";
import { RiArrowRightSFill } from "react-icons/ri";

const Header = () => {
  return (
    <div className="bg-[#F3EFE6] w-full h-screen">
      <div className="container h-full relative">
        <div className="space-y-[24px] absolute right-0 top-1/2 cursor-pointer transform -translate-y-2/3">
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
        <div className="container flex flex-col h-full w-full justify-between">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3">
            <Typographie
              variant="display"
              font="tungsten"
              theme="light"
              className=" header-text-stroke"
            >
              AIRPODS
            </Typographie>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3">
            <Image
              src="/img/png/airpodsPng.png"
              alt=""
              width={592}
              height={555}
            />
          </div>

          <div>
            <NavBar />
            <div className="flex items-center gap-1 mt-[30px] cursor-pointer">
              <Typographie variant="body-xs" theme="grey" font="ambit">
                Breadscrumb
              </Typographie>
              <RiArrowRightSFill size={15} className="text-grey" />
              <Typographie variant="body-xs" theme="grey" font="ambit">
                Breadscrumb
              </Typographie>
              <RiArrowRightSFill size={15} className="text-grey" />
              <Typographie variant="body-xs" theme="grey" font="ambit">
                Breadscrumb
              </Typographie>
            </div>
          </div>

          <div className="flex items-center justify-between w-full pb-[52px]">
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
              <Typographie variant="h1" font="cooper" className="uppercase max-w-[400px]">
                APPLE AIRPODS MAX
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

            <div className="space-y-[15px] w-full flex flex-col items-end">
              <Typographie variant="h3" font="ambit" className="text-end">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem sum.
              </Typographie>
              <div className="flex items-center gap-[15px] w-max">
                <div className=" w-fit rounded-full flex items-center gap-[15px] px-[15px] py-[5px] border-2 border-black border-dashed">
                  <HiMinus className="text-black/70 cursor-pointer" size={20} />
                  <Typographie font="ambit" weight="semibold" variant="h3">
                    1
                  </Typographie>
                  <AiOutlinePlus
                    className="text-black/70 cursor-pointer"
                    size={20}
                  />
                </div>
                <Button>Ajouter au panier - 579€</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
