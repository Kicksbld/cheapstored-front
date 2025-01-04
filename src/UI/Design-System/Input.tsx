import clsx from "clsx";
import localFont from "next/font/local";

interface Props {
  variant?: "text" | "email" | "password" | "tel";
  placeholder: string;
  pattern?: string;
  required?: boolean;
  className?: string;
  value?: string;  // Ajout de la prop value pour la liaison
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;  // Fonction pour gérer les changements
}

const Ambit = localFont({
  src: "../../pages/fonts/Ambit-SemiBold.woff2",
});

export const Input = ({
  className,
  pattern,
  variant = "text",
  placeholder,
  required,
  value,
  onChange,
}: Props) => {
  return (
    <input
      required={required}
      placeholder={placeholder}
      type={variant}
      pattern={pattern}
      value={value}  // Lier la valeur au state via cette prop
      onChange={onChange}  // Passer la fonction onChange
      className={clsx(
        Ambit.className,
        className,
        "bg-light border-2 md:text-base text-sm outline-none border-cloud w-full text-black/55 py-[15px] pl-[20px] rounded-[10px]"
      )}
    />
  );
};
