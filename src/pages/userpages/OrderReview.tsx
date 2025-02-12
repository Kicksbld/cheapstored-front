import { Button } from "@/UI/Design-System/Button";
import { Typographie } from "@/UI/Design-System/Typographie";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface UserData {
  lastName: string;
  firstName: string;
  address: string;
  postalCode: string;
  city: string;
  email: string;
  phoneNumber: string;
}

interface Product {
  productName: string;
  productPrice: number;
  quantity: number;
  productImages: Image[];
}

type Image = {
  id: number;
  src: string;
};

const OrderReview = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [userData, setUserData] = useState<UserData>({
    lastName: "",
    firstName: "",
    address: "",
    postalCode: "",
    city: "",
    email: "",
    phoneNumber: "",
  });
  const router = useRouter();

  useEffect(() => {
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
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        if (Array.isArray(parsedUserData) && parsedUserData.length > 0) {
          setUserData(parsedUserData[0]);
        }
      }
    }
  }, []);

  const calculateSubtotal = () => {
    return cart.reduce(
      (total, product) => total + product.productPrice * product.quantity,
      0
    );
  };

  const deliveryCost = 0;

  const taxes = 5.49;

  const totalTTC = calculateSubtotal() + deliveryCost + taxes;

  return (
    <div className="container pb-4">
      <div className=" mt-12 md:mt-[71px] space-y-[50px] max-w-[1027px]">
        <div className="space-y-[30px]">
          <Typographie variant="h2">
            Merci Beaucoup ! <br />
            <Typographie variant="h2">
              Votre commande a été passée avec succès
            </Typographie>
          </Typographie>
          <hr className="w-full border border-cloud" />
          <div className="space-y-[15px]">
            <Typographie variant="tag-title" theme="secondary">
              Nous vous avons envoyer les details de la confirmation de votre
              commande a l’addrese suivante: {userData.email}
            </Typographie>
            <Typographie variant="tag-title">
              Date de la commande: Samedi 17 Nov 2024
            </Typographie>
            <Typographie variant="tag-title" theme="modify">
              Numero de commande: 3
            </Typographie>
          </div>

          <Button onClick={() => router.push("/")}>
            Retourner a l&apos;accueil
          </Button>
        </div>
        <div className="w-full p-[30px] border border-cloud bg-light rounded-[10px] space-y-[20px] ">
          <div className="flex items-center justify-between w-full">
            <Typographie font="cooper" variant="h2">
              Résumé de la commande:
            </Typographie>
            <Image
              alt=""
              src="/img/svg/shield-tick.svg"
              width={35}
              height={35}
            />
          </div>
          <hr className="w-full border border-cloud" />
          <div className="space-y-[20px] w-full">
            {cart.length > 0 ? (
              cart.map((product, index) => (
                <div key={index}>
                  <div
                    key={index}
                    className="flex items-center justify-between flex-wrap gap-4"
                  >
                    <div className="flex gap-[20px]">
                      <div className="w-max h-max">
                        <Image
                          src={product.productImages[0].src}
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
                      <Typographie variant="body-sm" theme="grey" font="ambit">
                        {product.quantity} * {product.productPrice} €
                      </Typographie>
                    </div>
                  </div>
                  <hr className="border border-cloud w-full" />
                </div>
              ))
            ) : (
              <Typographie variant="body-sm" theme="grey" font="ambit">
                Aucun produit n&apos;a été trouvé.
              </Typographie>
            )}
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
                Frais de sercice & Taxes
              </Typographie>
              <Typographie font="ambit" variant="body-sm">
                {taxes.toFixed(2)} €
              </Typographie>
            </div>
            <hr className="border border-cloud w-full" />
            <div className="flex justify-between items-center">
              <Typographie font="ambit" variant="body-sm">
                Total TTC
              </Typographie>
              <Typographie font="ambit" variant="body-sm">
                {totalTTC.toFixed(2)} €
              </Typographie>
            </div>
          </div>
        </div>
        <div className="w-full p-[30px] border border-cloud bg-light rounded-[10px] space-y-[20px] ">
          <div className="flex items-center justify-between w-full">
            <Typographie font="cooper" variant="h2">
              Livraison:
            </Typographie>
            <Image
              alt=""
              src="/img/svg/truck-fast.svg"
              width={35}
              height={35}
            />
          </div>
          <hr className="w-full border border-cloud" />
          <div className="w-full flex gap-[50px] flex-wrap">
            <div className="space-y-[10px]">
              <Typographie font="ambit" theme="grey" weight="semibold">
                Addresse d’expédition
              </Typographie>
              <Typographie font="ambit" theme="grey">
                {userData.lastName} {userData.firstName}
              </Typographie>
              <Typographie font="ambit" theme="grey">
                {userData.address}
              </Typographie>
              <Typographie font="ambit" theme="grey">
                {userData.postalCode}, {userData.city}
              </Typographie>
            </div>
            <div className="space-y-[10px]">
              <Typographie font="ambit" theme="grey" weight="semibold">
                Contact
              </Typographie>
              <Typographie font="ambit" theme="grey">
                {userData.email}
              </Typographie>
              <Typographie font="ambit" theme="grey">
                {userData.phoneNumber}
              </Typographie>
            </div>
            <div className="space-y-[10px]">
              <Typographie font="ambit" theme="grey" weight="semibold">
                Méthode
              </Typographie>
              <Typographie font="ambit" theme="grey">
                Expedition Standard (3-5 jours)
              </Typographie>
            </div>
          </div>
        </div>
        <div className="w-full p-[30px] border border-cloud bg-light rounded-[10px] space-y-[20px] ">
          <div className="flex items-center justify-between w-full">
            <Typographie font="cooper" variant="h2">
              Payement:
            </Typographie>
            <Image alt="" src="/img/svg/cards.svg" width={35} height={35} />
          </div>
          <hr className="w-full border border-cloud" />
          <div className="w-full flex gap-[50px] flex-wrap">
            <div className="space-y-[10px]">
              <Typographie font="ambit" theme="grey" weight="semibold">
                Méthode de payement
              </Typographie>
              <Typographie font="ambit" theme="grey">
                Stripe Payement
              </Typographie>
            </div>
            <div className="space-y-[10px] ">
              <Typographie font="ambit" theme="grey" weight="semibold">
                Detail du payement
              </Typographie>
              <Typographie font="ambit" theme="grey">
                €{totalTTC.toFixed(2)} payé le 17/11/2024 a 12:16:27
              </Typographie>
            </div>
          </div>
        </div>

        <div className="space-y-[15px]">
          <Typographie font="ambit" theme="grey" weight="semibold">
            Besoin d’aide ?
          </Typographie>
          <div className="cursor-pointer" onClick={() => router.push("/userpages/ClientSupport")}>
            <Typographie font="ambit" theme="grey">
              Support Client
            </Typographie>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
