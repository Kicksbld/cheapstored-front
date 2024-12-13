import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import ProductCards from "@/UI/Components/ProductCards";
import localFont from 'next/font/local';
import CartProducts from "@/UI/Components/CartProducts";
import NavBar from "@/UI/Components/navigation/NavBar";


export default function Home() {
  return (
    <div className="px-[30px] space-y-4">
      <NavBar />
      <ProductCards />
      <CartProducts />
    </div>
  );
}

