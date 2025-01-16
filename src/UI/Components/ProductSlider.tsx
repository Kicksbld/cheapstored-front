import React, { useState } from "react";
import ProductCards from "./ProductCards";
import { Typographie } from "../Design-System/Typographie";
import { Button } from "../Design-System/Button";

const ProductSlider = () => {
  const [chosenCat, setChosenCat] = useState("all");

  return (
    <div className="container">
      <div className="flex items-center flex-wrap gap-4 w-full justify-between mt-[47px] mb-[55px]">
        <Typographie variant="h3" className="uppercase" font="cooper">
          • Le catalogue •
        </Typographie>
        <div className="flex items-center gap-[10px]">
          <Button
            onClick={() => setChosenCat("Apple")}
            variant={chosenCat === "Apple" ? "accent" : "outline"}
          >
            Apple
          </Button>
          <Button
            onClick={() => setChosenCat("Samsung")}
            variant={chosenCat === "Samsung" ? "accent" : "outline"}
          >
            Samsung
          </Button>
          <Button
            onClick={() => setChosenCat("all")}
            variant={chosenCat === "all" ? "accent" : "outline"}
          >
            Tous
          </Button>
        </div>
      </div>
      <div className="w-full mb-[30px] flex flex-wrap gap-[30px]">
        <div
          className="relative w-full max-w-[400px] aspect-square rounded-lg border border-cloud overflow-hidden bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url(/img/png/cardimg.png)",
          }}
        >
          <div className="absolute bottom-4 left-4 sm:left-6 lg:left-8 max-w-[90%]">
            <Typographie variant="h3" font="ambit">
              Remise de 20% la première semaine
            </Typographie>
          </div>
        </div>
        <ProductCards chosenCat={chosenCat} />
      </div>
    </div>
  );
};

export default ProductSlider;
