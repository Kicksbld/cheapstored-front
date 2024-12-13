import clsx from "clsx";
import localFont from "next/font/local";

interface Props {
  variant?:
    | "display"
    | "h1"
    | "h2"
    | "h3"
    | "body-base"
    | "body-sm"
    | "body-xs"
    | "tag-title";
  component?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "span"
    | "p"
    | "a"
    | "div";
  weight?: "regular" | "semibold" | "bold"; // Prise en charge des poids
  font?: "cooper" | "ambit" | "tungsten";
  className?: string;
  theme?:
    | "primary"
    | "secondary"
    | "tercery"
    | "modify"
    | "error"
    | "light"
    | "dark"
    | "grey"
    | "green";
  children: React.ReactNode;
}

// Définition des polices avec les différents poids
const Ambit = localFont({
  src: [
    {
      path: "../../pages/fonts/Ambit-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../pages/fonts/Ambit-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../pages/fonts/Ambit-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

const Cooper = localFont({
  src: "../../pages/fonts/CooperBT-Light.woff2", // Poids unique pour Cooper
});

const Tungsten = localFont({
  src: "../../pages/fonts/Tungsten-Bold.ttf",
});

export const Typographie = ({
  variant = "body-base",
  component: Component = "div",
  weight = "regular",
  font = "cooper",
  theme = "primary",
  className,
  children,
}: Props) => {
  let variantStyles = "";
  let colorStyles = "";

  // Gestion des couleurs en fonction du thème
  switch (theme) {
    case "primary":
      colorStyles = "text-primary";
      break;
    case "secondary":
      colorStyles = "text-secondary";
      break;
    case "tercery":
      colorStyles = "text-tercery";
      break;
    case "modify":
      colorStyles = "text-blue";
      break;
    case "error":
      colorStyles = "text-red";
      break;
    case "light":
      colorStyles = "text-light";
      break;
    case "dark":
      colorStyles = "text-black";
      break;
    case "grey":
      colorStyles = "text-grey";
      break;
    case "green":
      colorStyles = "text-green";
      break;
  }

  // Gestion des tailles de texte en fonction du variant
  switch (variant) {
    case "display":
      variantStyles = "text-4xl";
      break;
    case "h1":
      variantStyles = "text-3xl";
      break;
    case "h2":
      variantStyles = "text-2xl";
      break;
    case "h3":
      variantStyles = "text-xl";
      break;
    case "body-base":
      variantStyles = "text-base";
      break;
    case "body-sm":
      variantStyles = "text-sm";
      break;
    case "body-xs":
      variantStyles = "text-xs";
      break;
    case "tag-title":
      variantStyles = "text-tag";
      break;
  }

  let fontClass;

  switch (font) {
    case "ambit":
      fontClass = clsx(
        Ambit.className,
        weight === "semibold" && "font-semibold",
        weight === "regular" && "font-normal",
        weight === "bold" && "font-bold"
      );
      break;
    case "cooper":
      fontClass = Cooper.className;
      break;
    case "tungsten":
      fontClass = Tungsten.className;
      break;
  }

  return (
    <Component
      className={clsx(variantStyles, colorStyles, fontClass, className)}
    >
      {children}
    </Component>
  );
};
