import React from "react";
import ProductCards from "./ProductCards";
import { Typographie } from "../Design-System/Typographie";
import { Button } from "../Design-System/Button";
import { url } from "inspector";

const ProductSlider = () => {
  return (
    <div className="container">
      <div className="flex items-center w-full justify-between mt-[47px] mb-[55px]">
        <Typographie variant="h3" className="uppercase" font="cooper">
          • Le catalogue •
        </Typographie>
        <div className="flex items-center gap-[10px]">
          <Button variant="outline">Apple</Button>
          <Button>Samsung</Button>
        </div>
      </div>
      <div className="w-full mb-[30px] flex gap-[30px]">
        <div
          className="w-[400px] h-[477px] rounded-[18px] border border-cloud relative"
          style={{ backgroundImage: "url(/img/png/cardimg.png)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
        >
          <div className="absolute bottom-[34px] left-[30px] max-w-[300px]">
            <Typographie variant="h3" font="ambit">Remise de 20% la première semaine</Typographie>
          </div>
        </div>
        <ProductCards />
      </div>
    </div>
  );
};

export default ProductSlider;
