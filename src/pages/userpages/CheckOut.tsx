import CartProducts from "@/UI/Components/CartProducts";
import NavBar from "@/UI/Components/navigation/NavBar";
import { Button } from "@/UI/Design-System/Button";
import { Typographie } from "@/UI/Design-System/Typographie";
import Image from "next/image";
import React from "react";

const CheckOut = () => {
  return (
    <div className="container">
      <NavBar />
      <div className=" mt-[100px] cart-container mx-auto flex justify-between gap-[100px]">
        <div className="space-y-[35px] flex-[2]">
            
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
                Ajouter un nouveaux code
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

                <div className="flex items-center justify-between">
                  <div className="flex gap-[20px]">
                    <div className="w-max h-max">
                      <Image
                        src="/img/png/airpod.png"
                        alt=""
                        width={54}
                        height={50}
                      />
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
                    </div>
                  </div>
                  <div>
                    <Typographie variant="body-sm" theme="grey" font="ambit">
                      1 * 434,00€
                    </Typographie>
                    <Typographie
                      className="line-through"
                      variant="body-sm"
                      theme="grey"
                      font="ambit"
                    >
                      434,00€
                    </Typographie>
                    <Typographie variant="body-sm" theme="modify" font="ambit">
                      277.00€
                    </Typographie>
                  </div>
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
                <Button size="large" className="w-full" variant="filled">
                  Modifié votre panier
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
