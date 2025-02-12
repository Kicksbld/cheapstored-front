import React, { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { Typographie } from "@/UI/Design-System/Typographie";

type Productinfo = {
  description: string;
};

const AccordionItem = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-cloud border bg-light rounded-[10px] p-[20px]">
      <div
        className="flex items-center justify-between gap-[20px] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Typographie
          variant="tag-title"
          weight="semibold"
          font="ambit"
          theme="grey"
        >
          {title}
        </Typographie>
        {isOpen ? (
          <FiChevronUp size={20} className="text-grey transition-transform" />
        ) : (
          <FiChevronDown size={20} className="text-grey transition-transform" />
        )}
      </div>
      <div
        className={`mt-4 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {isOpen && (
          <Typographie font="ambit" className="max-w-[480px]" theme="grey">
            {content}
          </Typographie>
        )}
      </div>
    </div>
  );
};

const Accordion = ({ description }: Productinfo) => {
  return (
    <div className="space-y-[15px]">
      <AccordionItem title="Informations du produit" content={description} />
      <AccordionItem
        title="Conditions de Retour"
        content="Nous acceptons les retours dans un délai de 3 jours à compter de la réception de votre commande. Pour être éligible à un retour, l'article doit être dans son état d'origine, non utilisé et dans son emballage d'origine. Les frais de retour sont à la charge du client, sauf en cas de produit défectueux ou erreur de notre part. Veuillez contacter notre service client pour initier votre demande de retour."
      />
    </div>
  );
};

export default Accordion;
