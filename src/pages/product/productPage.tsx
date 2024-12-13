import NavBar from "@/UI/Components/navigation/NavBar";
import { Typographie } from "@/UI/Design-System/Typographie";
import React from "react";
import { RiArrowRightSFill } from "react-icons/ri";

const productPage = () => {
  return (
    <div className="bg-[#F3EFE6] w-full min-h-screen relative">
      <div className="container">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Typographie variant="display" font="tungsten" theme="light" className=" header-text-stroke">
            AIRPODS
          </Typographie>
        </div>

        <div >
          <NavBar />
        </div>

        <div className="flex items-center gap-1 mt-[30px] cursor-pointer">
          <Typographie variant="body-xs" theme="grey" font="ambit">
            Breadscrumb
          </Typographie>
          <RiArrowRightSFill size={15} className="text-grey" />
          <Typographie variant="body-xs" theme="grey" font="ambit">
            Breadscrumb
          </Typographie>
          <RiArrowRightSFill size={15} className="text-grey" />
          <Typographie variant="body-xs" theme="grey" font="ambit">
            Breadscrumb
          </Typographie>
        </div>
      </div>
    </div>
  );
};

export default productPage;
