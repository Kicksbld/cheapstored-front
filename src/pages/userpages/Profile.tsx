import NavBar from "@/UI/Components/navigation/NavBar";
import { Typographie } from "@/UI/Design-System/Typographie";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/UI/Design-System/Button";
import { useRouter } from "next/router";
import Link from "next/link";
import Cookies from "js-cookie";
import ModifyProfileInfo from "@/UI/Components/ModifyProfileInfo";
import Loader from "@/UI/Components/Loader";

interface UserData {
  adress: string;
  city: string;
  createdAt: string;
  email: string;
  id: number;
  name: string;
  password: string;
  postal: number;
}

interface Product {
  item: {
    categoryId: number;
    createdAt: string;
    headerItem: boolean;
    id: number;
    longDesc: string;
    name: string;
    price: number;
    quantity: number;
    shortDesc: string;
    images?: Image[]; // Optional if images might exist
  };
}

type Image = {
  id: number;
  src: string;
  itemId: number;
};

interface Order {
  id: number;
  createdAt: string;
  items: Product[];
  total: number;
  customer: UserData;
}

const Profile = () => {
  const [state, setState] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    adress: "",
    city: "",
    createdAt: "",
    email: "",
    id: 0,
    name: "",
    password: "",
    postal: 0,
  });
  const [modifyProfileInfo, setModifyProfileInfo] = useState(false);
  const [infoToModify, setInfoToModify] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clientOrder, setClientOrder] = useState<Order[]>([]); // Store filtered orders here
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const storedUserData = localStorage.getItem("userConnectedData");
      if (storedUserData) {
        try {
          const parsedUserData = JSON.parse(storedUserData);

          // If the data is an array, take the first element.
          if (Array.isArray(parsedUserData) && parsedUserData.length > 0) {
            setUserData(parsedUserData[0]);
          } else if (typeof parsedUserData === "object") {
            // If the data is an object, use it directly.
            setUserData(parsedUserData);
          }
        } catch (error) {
          console.error("Erreur lors du parsing des données:", error);
        }
      }
    }
  }, []);

  const disconnectUser = () => {
    Cookies.remove("authToken");
    router.push("/");
  };

  const handleModifyProfileInfo = (info: string) => () => {
    setInfoToModify(info);
    setModifyProfileInfo(true);
  };

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
        const filteredOrders = data.filter(
          (item) => item.customer.email === userData.email
        );
        setClientOrder(filteredOrders); // Set the filtered orders
      } catch (e) {
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [userData.email]); // Add userData.email as a dependency

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {modifyProfileInfo && (
        <ModifyProfileInfo
          id={userData.id}
          infoToModify={infoToModify}
          setModifyProfileInfo={setModifyProfileInfo}
        />
      )}
      <div className="container pb-4">
        <NavBar />
        <div className="max-w-[1338px] space-y-[70px] px-4 mx-auto pt-12 md:pt-[134px] pb-[100px]">
          <div className=" flex flex-col md:flex-row justify-between gap-x-10 gap-y-20">
            <div className="space-y-[20px] flex-1 md:max-w-[177px]">
              <div
                onClick={() => setState(1)}
                className="flex items-center justify-between cursor-pointer w-full"
              >
                <Typographie font="ambit" weight="semibold">
                  Mon compte
                </Typographie>
                <Image
                  src="/img/svg/user-round.svg"
                  width={20}
                  height={20}
                  alt="user picture"
                />
              </div>
              <div className="w-full h-[1px] bg-cloud"></div>
              <div
                onClick={() => setState(2)}
                className="flex items-center justify-between cursor-pointer w-full"
              >
                <Typographie font="ambit" weight="semibold">
                  Commandes
                </Typographie>
                <Image
                  src="/img/svg/truck.svg"
                  width={20}
                  height={20}
                  alt="truk"
                />
              </div>
              <div className="w-full h-[1px] bg-cloud"></div>
              <div
                onClick={disconnectUser}
                className="flex items-center justify-between cursor-pointer w-full"
              >
                <Typographie font="ambit" weight="semibold" theme="error">
                  Se déconnecter
                </Typographie>
                <Image
                  src="/img/svg/log-out.svg"
                  width={20}
                  height={20}
                  alt="logout"
                />
              </div>
            </div>
            <div>
              <div className="space-y-[50px] flex-[2] md:max-w-[651px] lg:max-w-[851px]">
                {state === 1 && (
                  <>
                    <div>
                      <Typographie variant="h2">Mon Profile</Typographie>
                      <Typographie theme="secondary" font="ambit">
                        Voir et mettez à jour les informations de votre profil,
                        y compris votre nom et votre adresse e-mail. Vous pouvez également mettre à jour votre
                        adresse de facturation ou changer votre mot de passe.
                      </Typographie>
                    </div>
                    <div className="w-full h-[1px] bg-cloud"></div>
                    <div className="space-y-[20px] w-full">
                      <div className="flex items-center justify-between cursor-pointer w-full">
                        <div className="space-y-[15px]">
                          <Typographie font="ambit" className="uppercase">
                            Nom
                          </Typographie>
                          <Typographie font="ambit" weight="semibold">
                            {userData.name}
                          </Typographie>
                        </div>
                        <Button
                          variant="modify"
                          onClick={handleModifyProfileInfo("Nom")}
                        >
                          Modifier
                        </Button>
                      </div>
                      <div className="w-full h-[1px] bg-cloud"></div>
                      <div className="flex items-center justify-between cursor-pointer w-full">
                        <div className="space-y-[15px]">
                          <Typographie font="ambit" className="uppercase">
                            Email
                          </Typographie>
                          <Typographie font="ambit" weight="semibold">
                            {userData.email}
                          </Typographie>
                        </div>
                        <Button
                          variant="modify"
                          onClick={handleModifyProfileInfo("Email")}
                        >
                          Modifier
                        </Button>
                      </div>
                      <div className="w-full h-[1px] bg-cloud"></div>
                      <div className="flex items-center justify-between cursor-pointer w-full">
                        <div className="space-y-[15px]">
                          <Typographie font="ambit" className="uppercase">
                            Mot de passe
                          </Typographie>
                          <Typographie font="ambit" weight="semibold">
                            {userData.password.slice(0, 10)}...
                          </Typographie>
                        </div>
                        <Button
                          variant="modify"
                          onClick={handleModifyProfileInfo("Mot de passe")}
                        >
                          Modifier
                        </Button>
                      </div>
                      <div className="w-full h-[1px] bg-cloud"></div>
                      <div className="flex items-center justify-between cursor-pointer w-full">
                        <div className="space-y-[15px]">
                          <Typographie font="ambit" className="uppercase">
                            Adresse de Facturation
                          </Typographie>
                          <Typographie font="ambit" weight="semibold">
                            {userData.adress}
                          </Typographie>
                        </div>
                        <Button
                          variant="modify"
                          onClick={handleModifyProfileInfo(
                            "Adresse de Facturation"
                          )}
                        >
                          Modifier
                        </Button>
                      </div>
                      <div className="w-full h-[1px] bg-cloud"></div>
                    </div>
                  </>
                )}
                {state === 2 && (
                  <>
                    <div>
                      <Typographie variant="h2">Mes commandes</Typographie>
                      <Typographie theme="secondary" font="ambit">
                        Voir vos commandes précédentes et leur statut. Vous
                        pouvez aussi créer un retour ou un échange si besoin en contactant le support en bas de page.
                      </Typographie>
                    </div>
                    <div className="w-full h-[1px] bg-cloud"></div>
                    {clientOrder.length > 0 ? (
                      clientOrder.map((item) => {
                        // Convert the date to European format
                        const createdAtDate = new Date(item.createdAt);
                        const formattedDate = `${createdAtDate
                          .getDate()
                          .toString()
                          .padStart(2, "0")}/${(createdAtDate.getMonth() + 1)
                          .toString()
                          .padStart(2, "0")}/${createdAtDate.getFullYear()}`;

                        return (
                          <div
                            key={item.id}
                            className="space-y-[20px] w-full md:w-[432px] border border-cloud bg-light rounded-[10px] p-[20px]"
                          >
                            <Typographie
                              theme="secondary"
                              font="ambit"
                              weight="semibold"
                            >
                              #{item.id}
                            </Typographie>
                            <div className="w-full flex items-center justify-between gap-[15px] flex-wrap">
                              <Typographie font="cooper" theme="grey">
                                {formattedDate}
                              </Typographie>
                              <Typographie font="cooper" theme="grey">
                                {item.items.length}
                              </Typographie>
                              <Typographie font="cooper" theme="grey">
                                € {item.total}
                              </Typographie>
                            </div>

                            <div className="w-full h-[1px] bg-cloud"></div>
                            {item.items.length > 0 ? (
                              <>
                                <div className="rounded-[6px] sm:w-[236px] w-full aspect-square p-[20px] border-cloud border bg-white relative">
                                  {item.items[0].item.images &&
                                  item.items[0].item.images.length >
                                    0 ? (
                                    <Image
                                      src={
                                        item.items[0].item.images[0].src
                                      }
                                      fill
                                      alt=""
                                      className="object-contain"
                                    />
                                  ) : (
                                    <Image
                                      src="/img/png/defaultImg.png"
                                      fill
                                      alt=""
                                      className="object-contain"
                                    />
                                  )}
                                </div>
                                <div className="w-full h-[1px] bg-cloud"></div>
                                <div className="flex items-center justify-between">
                                  <Typographie
                                    theme="modify"
                                    font="ambit"
                                    weight="semibold"
                                  >
                                    * {item.items[0].item.quantity}
                                  </Typographie>
                                </div>
                              </>
                            ) : (
                              <Typographie font="ambit" theme="modify">
                                Aucun produit trouvé.
                              </Typographie>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <Typographie font="ambit" theme="modify">
                        Aucune commande trouvée.
                      </Typographie>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] bg-cloud"></div>
          <div className="space-y-[30px] w-full">
            <Typographie variant="h2">Des Questions ?</Typographie>
            <div className="flex items-end flex-wrap gap-[10px] justify-between">
              <Typographie
                variant="h3"
                theme="secondary"
                weight="semibold"
                font="ambit"
              >
                Vous pouvez trouver nos informations de contact sur notre page support client.
              </Typographie>
              <Link
                href={"/userpages/ClientSupport"}
                className="flex items-center gap-[10px] cursor-pointer"
              >
                <Typographie font="ambit" theme="modify">
                  Support Client
                </Typographie>
                <Image
                  src="/img/svg/move-up-right.svg"
                  width={20}
                  height={20}
                  alt="arrow-right"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
