import CartProducts from "@/UI/Components/CartProducts";
import NavBar from "@/UI/Components/navigation/NavBar";
import { Button } from "@/UI/Design-System/Button";
import { Typographie } from "@/UI/Design-System/Typographie";
import Image from "next/image";
import React from "react";

const Cart = () => {
  return (
    <div className="container">
      <NavBar />
      <div className=" mt-[100px] mx-auto flex flex-col lg:flex-row justify-between gap-[100px]">
        <div className="space-y-[35px] flex-[2]">
          <Typographie font="cooper" variant="h2">
            Détail de votre Panier
          </Typographie>
          <div className="space-y-[15px]">
            <div className="flex justify-center items-center py-[8px] w-full border rounded-[10px] border-cloud bg-light">
              <div className="flex items-center gap-[10px] w-fit">
                <Image
                  src="/img/svg/bddIcon.svg"
                  alt=""
                  width={16}
                  height={16}
                />
                <Typographie
                  variant="body-sm"
                  theme="grey"
                  font="ambit"
                  weight="regular"
                >
                  {" "}
                  Connecte toi pour une meilleur expérience
                </Typographie>
                <Typographie
                  variant="body-sm"
                  className="underline cursor-pointer"
                  theme="grey"
                  font="ambit"
                  weight="semibold"
                >
                  me connecter
                </Typographie>
              </div>
            </div>
            <CartProducts />
            <CartProducts />
          </div>
        </div>
        <div className="space-y-[35px] flex-1">
          <Typographie font="cooper" variant="h2">
            Récapitulatif
          </Typographie>
          <div className="space-y-[15px]">
            <div className="border border-cloud rounded-[10px] p-[20px] bg-light space-y-[15px]">
              <div className="flex justify-between items-center ">
                <Typographie font="ambit" variant="body-sm">
                  Code activé
                </Typographie>
                <div className="w-max rounded-[5px] border border-[#A8F3D0] bg-[#D1FAE5] px-[7px] py-[2px]">
                  <Typographie theme="green" font="ambit" variant="body-sm">
                    NOEL20
                  </Typographie>
                </div>
              </div>
              <Button size="large" className="w-full" variant="outline">
                Ajouter au panier - 579 €
              </Button>
            </div>
            <div className="p-[20px] border border-cloud bg-light rounded-[10px]">
              <div className="space-y-[20px] w-full">
                <div className="flex justify-between items-center ">
                  <Typographie font="ambit" variant="body-sm">
                    Sous-total
                  </Typographie>
                  <Typographie font="ambit" variant="body-sm">
                    579 €
                  </Typographie>
                </div>
                <div className="flex justify-between items-center">
                  <Typographie font="ambit" variant="body-sm">
                    Livraison
                  </Typographie>
                  <Typographie font="ambit" variant="body-sm">
                    0,00 €
                  </Typographie>
                </div>
                <div className="flex justify-between items-center">
                  <Typographie font="ambit" variant="body-sm">
                    Frais de sercice & Taxes
                  </Typographie>
                  <Typographie font="ambit" variant="body-sm">
                    5.49 €
                  </Typographie>
                </div>
                <hr className="border border-cloud w-full" />
                <div className="flex justify-between items-center">
                  <Typographie font="ambit" variant="body-sm">
                    Total TTC
                  </Typographie>
                  <Typographie font="ambit" variant="body-sm">
                    584.49 €
                  </Typographie>
                </div>
                <hr className="border border-cloud w-full" />
                <Button size="large" className="w-full" variant="filled">Ajouter Au Panier - 579 €</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
