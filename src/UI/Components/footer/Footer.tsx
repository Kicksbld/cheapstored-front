import { Typographie } from "@/UI/Design-System/Typographie";
import { FaInstagram } from "react-icons/fa6";
import { FaSnapchat } from "react-icons/fa6";

export const Footer = () => {
  return (
    <section className="bg-[#F3EFE6] flex flex-col w-full h-max items-center justify-center gap-4 py-6">
      <Typographie variant="h3" component="h3" weight="bold" font="cooper">
        Retrouvez nous sur
      </Typographie>
      <div className="w-max flex gap-5 items-center justify-center">
        <a
          href="https://instagram.com"
          className="hover:opacity-65 transition-all duration-200 ease-linear focus:text-red-500"
        >
          <FaInstagram size={22} />
        </a>
        <a
          href="https://FaSnapchat.com"
          className="hover:opacity-65 transition-all duration-200 ease-linear focus:text-red-500"
        >
          <FaSnapchat size={22} />
        </a>
      </div>
    </section>
  );
};
