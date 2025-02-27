import { Button } from "@/UI/Design-System/Button";
import { Typographie } from "@/UI/Design-System/Typographie";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "@/UI/Components/Loader";

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

interface Order {
  id: number;
  createdAt: string;
  items: Product[];
  total: number;
  customer: UserData;
}

const OrderReview = () => {
  const [userData, setUserData] = useState<UserData>({
    lastName: "",
    firstName: "",
    address: "",
    postalCode: "",
    city: "",
    email: "",
    phoneNumber: "",
  });

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clientOrder, setClientOrder] = useState<Order>(); // Store filtered orders here
  const router = useRouter();

  useEffect(() => {
    const checkoutInProgress = localStorage.getItem("checkout_in_progress");

    if (checkoutInProgress) {
      localStorage.removeItem("cart"); // Supprime le panier
      localStorage.removeItem("checkout_in_progress"); // Nettoie le flag
    }
  }, []);

  useEffect(() => {
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

  const ORDERS_URL = "/api/orders";

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(ORDERS_URL);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Order[] = await res.json();

        // Filter orders directly after fetching
        const lastOrder = data
          .filter((item) => item.customer.email === userData.email)
          .pop(); // Get the last order in the filtered array

        setClientOrder(lastOrder); // Set the last order
      } catch (e) {
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [userData.email]); // Add userData.email as a dependency

  if (!clientOrder) {
    return <div>Aucune commande trouvée.</div>; // Handle the case where no order is found
  }

  const createdAtDate = new Date(clientOrder.createdAt);
  const formattedDate = `${createdAtDate
    .getDate()
    .toString()
    .padStart(2, "0")}/${(createdAtDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${createdAtDate.getFullYear()}`;

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(clientOrder);

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
              Date de la commande: {formattedDate}
            </Typographie>
            <Typographie variant="tag-title" theme="modify">
              Numero de commande: {clientOrder.id}
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
            {/* {cart.length > 0 ? (
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
            )} */}
            <div className="flex justify-between items-center ">
              <Typographie font="ambit" variant="body-sm">
                Sous-total
              </Typographie>
              <Typographie font="ambit" variant="body-sm">
                {clientOrder.total - 5} €
              </Typographie>
            </div>
            <div className="flex justify-between items-center">
              <Typographie font="ambit" variant="body-sm">
                Livraison
              </Typographie>
              <Typographie font="ambit" variant="body-sm">
                0 €
              </Typographie>
            </div>
            <div className="flex justify-between items-center">
              <Typographie font="ambit" variant="body-sm">
                Frais de sercice & Taxes
              </Typographie>
              <Typographie font="ambit" variant="body-sm">
                5 €
              </Typographie>
            </div>
            <hr className="border border-cloud w-full" />
            <div className="flex justify-between items-center">
              <Typographie font="ambit" variant="body-sm">
                Total TTC
              </Typographie>
              <Typographie font="ambit" variant="body-sm">
                {clientOrder.total} €
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
                € {clientOrder.total} payé le {formattedDate}
              </Typographie>
            </div>
          </div>
        </div>

        <div className="space-y-[15px]">
          <Typographie font="ambit" theme="grey" weight="semibold">
            Besoin d’aide ?
          </Typographie>
          <div
            className="cursor-pointer"
            onClick={() => router.push("/userpages/ClientSupport")}
          >
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
