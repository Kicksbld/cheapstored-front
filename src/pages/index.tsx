import Header from "@/UI/Components/Header";
import HomeSwiper from "@/UI/Components/HomeSwiper";
import ProductSlider from "@/UI/Components/ProductSlider";

export default function Home() {
  return (
    <div className="">
      <Header
        productName={"Test"}
        productPrice={0}
      />
      <HomeSwiper />
      <ProductSlider />
    </div>
  );
}
