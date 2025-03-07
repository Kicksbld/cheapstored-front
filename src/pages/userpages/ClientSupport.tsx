import { Button } from "@/UI/Design-System/Button";
import { Typographie } from "@/UI/Design-System/Typographie";
import React from "react";
import { useRouter } from "next/router";

const ClientSupport = () => {
  const router = useRouter();
  return (
    <div className="container pb-4 max-w-[500px] flex items-center justify-center min-h-screen w-full">
      <div className="space-y-[20px] max-w-fit">
        <Typographie font="cooper" variant="h2">
          Support Client
        </Typographie>
        <Typographie font="ambit" theme="secondary" className="max-w-[500px]">
          Pour toute question, demande ou problème, notre équipe de support est
          à votre disposition. N’hésitez pas à nous contacter à l’adresse ci
          dessous. Nous vous répondrons dans les plus brefs délais !
        </Typographie>
        <div className="flex items-center gap-4">
          <div onClick={() => router.push("mailto:cheapstored71@gmail.com")}>
            <Button variant="filled">Nous contacter</Button>
          </div>
          <div onClick={() => router.push("/")}>
            <Button>Retourner a l&apos;accueil</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSupport;
