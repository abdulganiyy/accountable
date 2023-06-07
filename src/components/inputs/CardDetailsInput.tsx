"use client";
import React, { FC, InputHTMLAttributes, useState } from "react";
import Image from "next/image";

interface CardDetailsInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  register?: any;
}

const CardDetailsInput: FC<CardDetailsInputProps> = ({
  label,
  placeholder,
  id,
  name,
  register,
  ...rest
}) => {
  return (
    <div className="relative flex flex-col gap-y-2 font-normal text-sm">
      <span className="absolute cursor-pointer right-2 top-[40px]">
        <Image
          alt="logomastercard"
          src="/logos_mastercard.svg"
          height={24}
          width={24}
        />
      </span>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        className="px-3 py-3.5 border-[1px] outline-none border-[#EAEDEF] rounded-md"
        placeholder={placeholder}
        {...rest}
        {...register(name)}
      />
    </div>
  );
};

export default CardDetailsInput;
