import React, { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

const Button: FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      className="h-[48px] w-full rounded-md flex items-center justify-center bg-[#071A7E] text-white"
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
