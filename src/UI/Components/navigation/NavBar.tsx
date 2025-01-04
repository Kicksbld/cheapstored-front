import { Typographie } from "@/UI/Design-System/Typographie";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div className="flex items-center pt-[35px]">
      <div className="md:w-full">
        <Link href="/">
          <Image alt="" src="/img/svg/CST.svg" width={44} height={24} />
        </Link>
      </div>
      <ul className=" items-center gap-[21px] hidden md:flex ">
        <Typographie className="w-max cursor-pointer" font="ambit">
          Explore
        </Typographie>
        <Typographie className="w-max cursor-pointer" font="ambit">
          Bedroom
        </Typographie>
        <Typographie className="w-max cursor-pointer" font="ambit">
          Sleepower
        </Typographie>
        <Typographie className="w-max cursor-pointer" font="ambit">
          Blog
        </Typographie>
        <Typographie className="w-max cursor-pointer" font="ambit">
          About Us
        </Typographie>
      </ul>
      <div className="flex items-center w-full justify-end gap-[21px]">
        <Typographie className="cursor-pointer" font="ambit">
          Se connecter
        </Typographie>
        <div className="flex items-center gap-[10px] cursor-pointer">
          <Image alt="" src="/img/svg/cart.svg" width={20} height={20} />
          <Link href="/userpages/Cart">
            <Typographie font="ambit">Panier</Typographie>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
