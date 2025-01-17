import React from "react";
import { Typographie } from "../Design-System/Typographie";
import Image from "next/image";

const HomeSwiper = () => {
  return (
    <div className="w-full py-[10px] md:py-[25px] bg-[#6D4701] overflow-hidden">
      <div className="flex w-max items-center gap-[40px] animate-slider">
        <Typographie className="uppercase" theme="light" variant="h2">
          Remise de 20% la première semaine
        </Typographie>
        <Image alt="" src="img/svg/starHome.svg" width={15} height={15} />
        <Typographie className="uppercase" theme="light" variant="h2">
          livraison gratuite
        </Typographie>
        <Image alt="" src="img/svg/starHome.svg" width={15} height={15} />
        <Typographie className="uppercase" theme="light" variant="h2">
          fonctionnement
        </Typographie>
        <Image alt="" src="img/svg/starHome.svg" width={15} height={15} />
        <Typographie className="uppercase" theme="light" variant="h2">
          fonctionnement
        </Typographie>
        <Image alt="" src="img/svg/starHome.svg" width={15} height={15} />
        <Typographie className="uppercase" theme="light" variant="h2">
          Remise de 20% la première semaine
        </Typographie>
        <Image alt="" src="img/svg/starHome.svg" width={15} height={15} />
        <Typographie className="uppercase" theme="light" variant="h2">
          livraison gratuite
        </Typographie>
        <Image alt="" src="img/svg/starHome.svg" width={15} height={15} />
        <Typographie className="uppercase" theme="light" variant="h2">
          fonctionnement
        </Typographie>
        <Image alt="" src="img/svg/starHome.svg" width={15} height={15} />
        <Typographie className="uppercase" theme="light" variant="h2">
          fonctionnement
        </Typographie>
      </div>
      
    </div>
  );
};

export default HomeSwiper;
