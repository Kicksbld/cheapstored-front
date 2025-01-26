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
  productImages: Image[]
}

type Image = {
  id: number;
  src: string;
}

interface UserData {
  lastName: string;
  firstName: string;
  address: string;
  postalCode: string;
  city: string;
  email: string;
  phoneNumber: string;
}

const CheckOut = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/userpages/Cart");
  };

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
    const subtotal = cart.reduce(
        (total, product) => total + product.productPrice * product.quantity,
        0
    );
    return parseFloat(subtotal.toFixed(2)); // Arrondi à 2 décimales
  };


  const deliveryCost = 0;

  const taxes = 5.49;

  const totalTTC = calculateSubtotal() + deliveryCost + taxes;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify([userData]));

    console.log("Données utilisateur mises à jour:", userData);
    router.push("/userpages/Payement");
  };

  return (
    <div className="container pb-4">
      <NavBar />
      <div className="mt-12 page-container md:mt-[100px] mx-auto flex flex-col lg:flex-row md:justify-between gap-[100px]">
        <div className="space-y-[35px] lg:flex-[2] flex-1">
          <div className="p-[30px] border border-cloud rounded-[10px] space-y-[40px]">
            <div className="flex items-center justify-between w-full">
              <Typographie font="cooper" variant="h2">
                Adresse d&apos;expédition
              </Typographie>
              <Image alt="" src="/img/svg/mailbox.svg" width={35} height={35} />
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-[40px] w-full flex items-center flex-col"
            >
              <div className="flex w-full gap-2 flex-wrap md:flex-nowrap">
                <div className="space-y-[8px] w-full">
                  <Typographie variant="h3" font="ambit">
                    Nom <span className="text-red">*</span>
                  </Typographie>
                  <Input
                    required
                    placeholder="Enter votre nom de famille"
                    value={userData.lastName}
                    onChange={(e) =>
                      setUserData({ ...userData, lastName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-[8px] w-full">
                  <Typographie variant="h3" font="ambit">
                    Prénom <span className="text-red">*</span>
                  </Typographie>
                  <Input
                    required
                    placeholder="Enter votre Prénom"
                    value={userData.firstName}
                    onChange={(e) =>
                      setUserData({ ...userData, firstName: e.target.value })
                    }
                  />
                </div>
              </div>
              <hr className="w-full border border-cloud" />
              <div className="space-y-[8px] w-full">
                <Typographie variant="h3" font="ambit">
                  Adresse de Livraison <span className="text-red">*</span>
                </Typographie>
                <div className="w-full flex gap-[15px] flex-wrap md:flex-nowrap">
                  <Input
                    required
                    placeholder="Adresse"
                    value={userData.address}
                    onChange={(e) =>
                      setUserData({ ...userData, address: e.target.value })
                    }
                  />
                  <Input
                    required
                    placeholder="Code Postale"
                    value={userData.postalCode}
                    onChange={(e) =>
                      setUserData({ ...userData, postalCode: e.target.value })
                    }
                  />
                  <Input
                    required
                    placeholder="Ville"
                    value={userData.city}
                    onChange={(e) =>
                      setUserData({ ...userData, city: e.target.value })
                    }
                  />
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
                  <Input
                    required
                    variant="email"
                    placeholder="exemple@email.com"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-[8px] w-full">
                  <Typographie variant="h3" font="ambit">
                    Numero de téléphone <span className="text-red">*</span>
                  </Typographie>
                  <Input
                    required
                    variant="tel"
                    placeholder="+33 06 03 69 41 20"
                    value={userData.phoneNumber}
                    onChange={(e) =>
                      setUserData({ ...userData, phoneNumber: e.target.value })
                    }
                  />
                </div>
              </div>
              <Button
                type="submit"
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
            <div className=" flex flex-col items-center gap-4 w-full p-[30px] border border-cloud bg-light rounded-[10px] ">
              <div className="flex items-center justify-between w-full">
                <Typographie font="cooper" variant="h2">
                  Payement
                </Typographie>
                <Image alt="" src="/img/svg/cards.svg" width={35} height={35} />
              </div>
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
                        <Typographie
                          variant="body-sm"
                          theme="grey"
                          font="ambit"
                        >
                          {product.quantity} * {product.productPrice} €
                        </Typographie>
                      </div>
                    </div>
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

                <Button
                  onClick={handleClick}
                  size="large"
                  className="w-full"
                  variant="filled"
                >
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
