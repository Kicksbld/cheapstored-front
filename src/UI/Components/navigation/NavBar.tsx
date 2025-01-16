import { Typographie } from "@/UI/Design-System/Typographie";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérifie si l'utilisateur est connecté au montage du composant
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="flex items-center pt-[35px]">
      <div className="md:w-full">
        <Link href="/">
          <Image alt="" src="/img/svg/CST.svg" width={44} height={24} />
        </Link>
      </div>
      <div className="flex items-center w-full justify-end gap-[21px]">
        {isAuthenticated ? (
          <Link href="/userpages/Profile">
            <Typographie className="cursor-pointer" font="ambit">
              Mon Compte
            </Typographie>
          </Link>
        ) : (
          <Link href="/userpages/LogIn">
            <Typographie className="cursor-pointer" font="ambit">
              Se connecter
            </Typographie>
          </Link>
        )}
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
