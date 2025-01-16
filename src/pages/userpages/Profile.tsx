import NavBar from "@/UI/Components/navigation/NavBar";
import { Typographie } from "@/UI/Design-System/Typographie";
import Image from "next/image";
import React from "react";

const Profile = () => {
  return (
    <div className="container pb-4">
      <NavBar />
      <div className="max-w-[1338px] px-4 mx-auto pt-[134px] flex gap-[210px]">
        <div className="space-y-[20px] flex-1 ">
          <div className="flex items-center justify-between cursor-pointer">
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
          <div className="flex items-center justify-between cursor-pointer">
            <Typographie font="ambit" weight="semibold">
              Adresse
            </Typographie>
            <Image src="/img/svg/truck.svg" width={20} height={20} alt="truk" />
          </div>
          <div className="w-full h-[1px] bg-cloud"></div>
          <div className="flex items-center justify-between cursor-pointer">
            <Typographie font="ambit" weight="semibold" theme="error">
              Se deconnecter
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
          <div className="flex-[4] space-y-[50px]">
            <div>
              <Typographie variant="h2">Mon Profile</Typographie>
              <Typographie theme="secondary" font="ambit">
                Voir et mettez a jour les informations de votre profile, y
                compris votre nom , votre adresse e-mail et numero de téléphone.
                Vous pouvez également mettre a jour votre adresse de facturation
                ou changer votre mot de passe.{" "}
              </Typographie>
            </div>
            <div className="w-full h-[1px] bg-cloud"></div>
            <div className="space-y-[20px] w-[177px]">
              <div className="flex items-center justify-between cursor-pointer">
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
              <div className="flex items-center justify-between cursor-pointer">
                <Typographie font="ambit" weight="semibold">
                  Adresse
                </Typographie>
                <Image
                  src="/img/svg/truck.svg"
                  width={20}
                  height={20}
                  alt="truk"
                />
              </div>
              <div className="w-full h-[1px] bg-cloud"></div>
              <div className="flex items-center justify-between cursor-pointer">
                <Typographie font="ambit" weight="semibold" theme="error">
                  Se deconnecter
                </Typographie>
                <Image
                  src="/img/svg/log-out.svg"
                  width={20}
                  height={20}
                  alt="logout"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
