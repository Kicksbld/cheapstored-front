import clsx from "clsx";

interface Props {
  size?: "small" | "medium" | "large";
  variant?:
    | "accent"
    | "outline"
    | "filled"
    | "delete"
    | "modify"
    | "noBorder"
    | "icon";
  icon?: { icon: React.ElementType };
  iconTheme?: "accent" | "secondary";
  iconPosition?: "left" | "right";
  className?: string;
  children?: React.ReactNode;
}

export const Button = ({
  size = "medium",
  className,
  variant = "accent",
  icon,
  iconTheme = "accent",
  iconPosition = "right",
  children,
}: Props) => {
  let variantStyles: string = "",
    sizeStyles: string = "",
    iconSize: number = 0;

  switch (variant) {
    case "accent":
      variantStyles = "bg-none text-black rounded-full border-2 border-black";
      break;
    case "outline":
      variantStyles =
        "bg-none border-2 border-black border-dashed text-black rounded-full";
      break;
    case "filled":
      variantStyles = "bg-black text-white rounded-full";
      break;
    case "delete":
      variantStyles =
        "bg-none border-2 border-dashed border-red text-red rounded-full";
      break;
    case "modify":
      variantStyles =
        "bg-none border-2 border-dashed border-blue text-blue rounded-full";
      break;
    case "noBorder":
      variantStyles =
        "bg-none text-tercery";
      break;
    case "icon":
      if (iconTheme === "accent") {
        variantStyles =
          "bg-linear border border-secondary hover:opacity-85 rounded-full";
      }
      if (iconTheme === "secondary") {
        variantStyles =
          "bg-light border-primary border hover:bg-white/70 rounded-full";
      }
      break;
  }

  switch (size) {
    case "small":
      sizeStyles = `text-sm  ${
        variant === "icon"
          ? " flex items-center justify-center w-[40px] h-[40px]"
          : "py-[5px] px-[15px]"
      }`;
      iconSize = 18;
      break;
    case "medium":
      sizeStyles = `text-tag ${
        variant === "icon"
          ? " flex items-center justify-center w-[50px] h-[50px]"
          : "py-[8px] px-[20px]"
      }`;
      iconSize = 20;
      break;
    case "large":
      sizeStyles = `text-xl ${
        variant === "icon"
          ? " flex items-center justify-center w-[70px] h-[70px]"
          : "py-[10px] px-[25px]"
      }`;
      iconSize = 25;
      break;
  }

  return (
    <>
      <button
        type="button"
        className={clsx(
          "font-AmbitRegular",
          variantStyles,
          sizeStyles,
          iconSize,
          className
        )}
      >
        {icon && variant === "icon" ? (
          <icon.icon size={iconSize} />
        ) : (
          <>
            <div className={clsx(icon && "flex items-center gap-2")}>
              {icon && iconPosition === "left" && <icon.icon size={iconSize} />}
              {children}
              {icon && iconPosition === "right" && (
                <icon.icon size={iconSize} />
              )}
            </div>
          </>
        )}
      </button>
    </>
  );
};
