import clsx from "clsx";

interface ButtonProps {
  variant: "primary" | "secondary" | "round" | "roundchips";
  // text : string | React.ReactNode; text is restrictive, children makes the component more flexible:
  children:  React.ReactNode;
  startIcon?: undefined;
  // endIcon?: ReactElement;  //You can consider making startIcon and endIcon optional by setting default values as undefined to ensure the layout doesn’t break if no icon is passed.
  endIcon?: undefined;
  size: "sm" | "md" | "lg" | "vsm";
  onClick?: () => void;
}

const variantstyles = {
  primary: "bg-zinc-900 text-white rounded-lg   hover:bg-black/60 font-normal trasition duration-200 flex justify-center items-center",
  round: "bg-zinc-900 text-white  rounded-full  hover:bg-black/60 font-normal trasition duration-200 flex justify-center items-center",
  roundchips: "bg-zinc-700 text-white font-medium rounded-lg  hover:bg-black/60 font-normal  flex justify-center items-center",
  secondary: "bg-white/10  border-gray-300/40 text-gray-300 rounded-full  font-normal  hover:bg-zinc-700 hover:text-gray-300   transition duration-200 flex justify-center items-center",
};

const sizeStyles = {
  vsm: "px-3 py-1 text-[.7rem]",
  sm: "px-4 py-1 text-[.9rem]",
  md: "px-3 py-2 text-md",
  lg: "px-4 py-2 text-lg",
};

const defaultStyles =
  "font-sans font-semibold shadow  flex justify-center items-center cursor-pointer";

export const Button = ({
  variant = "primary",
  children,
  startIcon,
  endIcon,
  size = "md", 
  onClick
}: ButtonProps) => {
  return (
    <button
     type="button" //it’s a good practice to add type="button" to avoid accidental form submissions.
    onClick={onClick}
      // className={
      //   sizeStyles[size] + " " + variantstyles[variant] + " " + defaultStyles
      // }
      className={clsx(sizeStyles[size], variantstyles[variant], defaultStyles)} //better way to write with clsx

    >
      <div className="flex justify-center items-center gap-2 ">
       {startIcon}
       <div>{children}</div>

        {endIcon}
      </div>
    </button>
  );
};
