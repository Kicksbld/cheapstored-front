import { Button } from "@/UI/Design-System/Button";
import { Typographie } from "@/UI/Design-System/Typographie";
import { useRouter } from "next/router";
import React from "react";

const Payement = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/userpages/OrderReview");
  };
  return (
    <div className="min-h-screen w-full grid place-content-center space-y-5">
      <Typographie variant="h2">Payement Stripe</Typographie>
      <Button onClick={handleClick} variant="filled" size="medium">
        Payer
      </Button>
    </div>
  );
};

export default Payement;
