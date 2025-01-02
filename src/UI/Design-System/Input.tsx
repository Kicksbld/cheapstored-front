import clsx from "clsx";
import localFont from "next/font/local";

interface Props {
  variant?: "text" | "email" | "password" | "tel";
  placeholder: string;
  className?: string;
}

const Ambit = localFont({
  src: "../../pages/fonts/Ambit-SemiBold.woff2",
});

export const Input = ({ className, variant = "text", placeholder }: Props) => {
  return (
    <input
      placeholder={placeholder}
      type={variant}
      className={clsx(
        Ambit.className,
        className,
        "bg-light border-2 md:text-base text-sm outline-none border-cloud w-full  text-black/55 py-[15px] pl-[20px] rounded-[10px]"
      )}
    />
  );
};
