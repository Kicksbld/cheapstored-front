import { Typographie } from "@/UI/Design-System/Typographie";
import { FaInstagram, FaTiktok, FaSnapchat } from "react-icons/fa6";

export const Footer = () => {
  return (
    <section className="bg-[#F3EFE6] flex flex-col w-full h-max items-center justify-center gap-4 py-6">
      <Typographie variant="h3" component="h3" weight="bold" font="cooper">
        Retrouvez nous sur
      </Typographie>
      <div className="w-max flex gap-5 items-center justify-center">
        <a
          href="https://snapchat.com/add/survet71?share_id=08JGAsMiQWaK9ae3hzWMVA&locale=fr_FR"
          className="hover:opacity-65 transition-all duration-200 ease-linear focus:text-red-500"
        >
          <FaSnapchat size={22} />
        </a>
        <a
          href="https://instagram.com/c.s.t_71?igsh=MW9sZXh3YmZIbG45Ng%3D&utm_source=qr"
          className="hover:opacity-65 transition-all duration-200 ease-linear focus:text-red-500"
        >
          <FaInstagram size={22} />
        </a>
        <a
          href="https://tiktok.com/@cst_store?t=ZN-8ueZtQkNSIS&_r=1"
          className="hover:opacity-65 transition-all duration-200 ease-linear focus:text-red-500"
        >
          <FaTiktok size={22} />
        </a>
      </div>
    </section>
  );
};
