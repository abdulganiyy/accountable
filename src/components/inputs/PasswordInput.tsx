"use client";
import React, { FC, InputHTMLAttributes, useState } from "react";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  register?: any;
}

const PasswordInput: FC<PasswordInputProps> = ({
  label,
  placeholder,
  id,
  name,
  register,
  ...rest
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative flex flex-col gap-y-2 font-normal text-sm">
      <label htmlFor={id}>{label}</label>
      <input
        type={show ? "text" : "password"}
        id={id}
        className="px-3 py-3.5 border-[1px] outline-none border-[#EAEDEF] rounded-md"
        placeholder={placeholder}
        {...rest}
        {...register(name)}
      />
    </div>
  );
};

export default PasswordInput;
