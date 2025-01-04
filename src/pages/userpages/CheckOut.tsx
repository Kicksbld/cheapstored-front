import NavBar from "@/UI/Components/navigation/NavBar";
import { Button } from "@/UI/Design-System/Button";
import { Input } from "@/UI/Design-System/Input";
import { Typographie } from "@/UI/Design-System/Typographie";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";

interface Product {
  productName: string;
  productPrice: number;
  quantity: number;
}

const CheckOut = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/userpages/Cart");
  };

  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const cartStorage = localStorage.getItem("cart");

      if (cartStorage) {
        try {
          const parsedCart = JSON.parse(cartStorage);
          if (Array.isArray(parsedCart)) {
            setCart(parsedCart);
          } else {
            console.error("Le panier dans localStorage est mal formaté.");
          }
        } catch (e) {
          console.error(
            "Erreur lors du parsing du panier depuis localStorage.",
            e
          );
        }
      }
    }
  }, []);

  // Calculate the subtotal of the cart (sum of prices * quantity)
  const calculateSubtotal = () => {
    return cart.reduce(
      (total, product) => total + product.productPrice * product.quantity,
      0
    );
  };

  // Delivery cost is set to 0
  const deliveryCost = 0;

  // Taxes are fixed as 5.49€
  const taxes = 5.49;

  // Total TTC (including subtotal + delivery + taxes)
  const totalTTC = calculateSubtotal() + deliveryCost + taxes;

  return (
    <div className="container pb-4">
      <NavBar />
      <div className="mt-12 md:mt-[100px] mx-auto flex flex-col lg:flex-row md:justify-between gap-[100px]">
        <div className="space-y-[35px] lg:flex-[2] flex-1">
          <div className="p-[30px] border border-cloud rounded-[10px] space-y-[40px]">
            <div className="flex items-center justify-between w-full">
              <Typographie font="cooper" variant="h2">
                Adresse d&apos;expédition
              </Typographie>
              <Image alt="" src="/img/svg/mailbox.svg" width={35} height={35} />
            </div>
            <form
              action=""
              className="space-y-[40px] w-full flex items-center flex-col"
            >
              <div className="flex w-full gap-2 flex-wrap md:flex-nowrap">
                <div className="space-y-[8px] w-full">
                  <Typographie variant="h3" font="ambit">
                    Nom <span className="text-red">*</span>
                  </Typographie>
                  <Input placeholder="Enter votre nom de famille" />
                </div>
                <div className="space-y-[8px] w-full">
                  <Typographie variant="h3" font="ambit">
                    Prénom <span className="text-red">*</span>
                  </Typographie>
                  <Input placeholder="Enter votre Prénom" />
                </div>
              </div>
              <hr className="w-full border border-cloud" />
              <div className="space-y-[8px] w-full">
                <Typographie variant="h3" font="ambit">
                  Adresse de Livraison <span className="text-red">*</span>
                </Typographie>
                <div className="w-full flex gap-[15px] flex-wrap md:flex-nowrap">
                  <Input placeholder="Adresse" />
                  <Input placeholder="Code Postale" />
                  <Input placeholder="Ville" />
                </div>
                <div className="flex gap-[10px] items-center">
                  <input type="checkbox" className="accent-secondary" />
                  <Typographie font="ambit" variant="body-sm" theme="secondary">
                    Adresse de facturation identique à l&apos;adresse de
                    livraison ?
                  </Typographie>
                </div>
              </div>
              <hr className="w-full border border-cloud" />
              <div className="flex w-full gap-2 flex-wrap md:flex-nowrap">
                <div className="space-y-[8px] w-full">
                  <Typographie variant="h3" font="ambit">
                    Email <span className="text-red">*</span>
                  </Typographie>
                  <Input variant="email" placeholder="exemple@email.com" />
                </div>
                <div className="space-y-[8px] w-full">
                  <Typographie variant="h3" font="ambit">
                    Numero de téléphone <span className="text-red">*</span>
                  </Typographie>
                  <Input variant="tel" placeholder="+33 06 03 69 41 20" />
                </div>
              </div>
              <Button
                className="md:w-[408px] flex justify-center"
                variant="filled"
                icon={{ icon: FaChevronRight }}
              >
                Continuer la Livraison
              </Button>
            </form>
          </div>
          <div className="flex items-center w-full gap-[20px]">
            <div className="dashed"> </div>
            <Typographie className="min-w-max" variant="h3">
              PROCHAINE ETAPES
            </Typographie>
            <div className="dashed"> </div>
          </div>
          <div className="space-y-[25px] w-full">
            <div className="flex items-center justify-between w-full p-[30px] border border-cloud bg-light rounded-[10px] ">
              <Typographie font="cooper" variant="h2">
                Livraison
              </Typographie>
              <Image alt="" src="/img/svg/box.svg" width={35} height={35} />
            </div>
            <div className="flex items-center justify-between w-full p-[30px] border border-cloud bg-light rounded-[10px] ">
              <Typographie font="cooper" variant="h2">
                Payement
              </Typographie>
              <Image alt="" src="/img/svg/cards.svg" width={35} height={35} />
            </div>
            <div className="flex items-center justify-between w-full p-[30px] border border-cloud bg-light rounded-[10px] ">
              <Typographie font="cooper" variant="h2">
                Résumé de la commande
              </Typographie>
              <Image
                alt=""
                src="/img/svg/shield-tick.svg"
                width={35}
                height={35}
              />
            </div>
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
                    {calculateSubtotal()} €
                  </Typographie>
                </div>
                <div className="flex justify-between items-center">
                  <Typographie font="ambit" variant="body-sm">
                    Livraison
                  </Typographie>
                  <Typographie font="ambit" variant="body-sm">
                    {deliveryCost.toFixed(2)} €
                  </Typographie>
                </div>
                <div className="flex justify-between items-center">
                  <Typographie font="ambit" variant="body-sm">
                    Frais de service & Taxes
                  </Typographie>
                  <Typographie font="ambit" variant="body-sm">
                    {taxes.toFixed(2)} €
                  </Typographie>
                </div>
                <hr className="border border-cloud w-full" />
                {cart.length > 0 ? (
                  cart.map((product, index) => (
                    <>
                      <div
                        key={index}
                        className="flex items-center justify-between flex-wrap gap-4"
                      >
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
                            <Typographie
                              variant="body-sm"
                              theme="dark"
                              font="ambit"
                            >
                              {product.productName}
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
                          <Typographie
                            variant="body-sm"
                            theme="grey"
                            font="ambit"
                          >
                            {product.quantity} * {product.productPrice} €
                          </Typographie>
                        </div>
                      </div>
                      <hr className="border border-cloud w-full" />
                    </>
                  ))
                ) : (
                  <Typographie variant="body-sm" theme="grey" font="ambit">
                    Aucun produit n&apos;a été trouvé.
                  </Typographie>
                )}

                <div className="flex justify-between items-center">
                  <Typographie font="ambit" variant="body-sm">
                    Total TTC
                  </Typographie>
                  <Typographie font="ambit" variant="body-sm">
                    {totalTTC.toFixed(2)} €
                  </Typographie>
                </div>
                <hr className="border border-cloud w-full" />

                <Button onClick={handleClick} size="large" className="w-full" variant="filled">
                  Modifiez votre panier
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
