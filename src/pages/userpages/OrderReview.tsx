import NavBar from "@/UI/Components/navigation/NavBar";
import { Typographie } from "@/UI/Design-System/Typographie";
import Image from "next/image";
import React from "react";

const OrderReview = () => {
  return (
    <div className="container pb-4">
      <NavBar />
      <div className="mt-[71px] space-y-[50px] max-w-[1027px]">
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
              commande a l’addrese suivante: exemple@email.com
            </Typographie>
            <Typographie variant="tag-title">
              Date de la commande: Samedi 17 Nov 2024
            </Typographie>
            <Typographie variant="tag-title" theme="modify">
              Numero de commande: 3
            </Typographie>
          </div>
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
          <div className="w-full flex gap-[50px]">
            <div className="space-y-[10px]">
              <Typographie font="ambit" theme="grey" weight="semibold">
                Addresse d’expédition
              </Typographie>
              <Typographie font="ambit" theme="grey">
                John Doe
              </Typographie>
              <Typographie font="ambit" theme="grey">
                15 Rue de la République
              </Typographie>
              <Typographie font="ambit" theme="grey">
                75000, Paris
              </Typographie>
              <Typographie font="ambit" theme="grey">
                FR
              </Typographie>
            </div>
            <div className="space-y-[10px]">
              <Typographie font="ambit" theme="grey" weight="semibold">
                Contact
              </Typographie>
              <Typographie font="ambit" theme="grey">
                exemple@email.com
              </Typographie>
            </div>
            <div className="space-y-[10px]">
              <Typographie font="ambit" theme="grey" weight="semibold">
                Méthode
              </Typographie>
              <Typographie font="ambit" theme="grey">
                Expedition Standard (€10,00)
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
          <div className="w-full flex gap-[50px]">
            <div className="space-y-[10px]">
              <Typographie font="ambit" theme="grey" weight="semibold">
                Méthode de payement
              </Typographie>
              <Typographie font="ambit" theme="grey">
                Payement Manuel
              </Typographie>
            </div>
            <div className="space-y-[10px]">
              <Typographie font="ambit" theme="grey" weight="semibold">
                Detail du payement
              </Typographie>
              <Typographie font="ambit" theme="grey">
                €10,00 payé le 17/11/2024 a 12:16:27
              </Typographie>
            </div>
          </div>
        </div>
        <div className="space-y-[15px]">
          <Typographie font="ambit" theme="grey" weight="semibold">
            Besoin d’aide ?
          </Typographie>
          <Typographie font="ambit" theme="grey">
            Support Client
          </Typographie>
          <Typographie font="ambit" theme="grey">
            Retours et échanges
          </Typographie>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
