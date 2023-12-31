import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  text?: string;
  title?: string;
  link?: string;
}

const Header: FC<HeaderProps> = ({ text, title, link}) => {
  return (
    <div className="max-w-screen-2xl mx-auto flex justify-between items-center h-16 px-4 md:px-16 border-b-[1px] border-[#EAEDEF]">
      <div>
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={150} height={20} />
        </Link>
      </div>
      <div className="text-[#555555] font-semibold text-sm flex items-center">
        <span className="hidden md:block">{text || "Have an account?"}</span>
        <Link
          href={link || "/login"}
          className="text-[#DF5753] font-medium ml-2"
        >
          {title || "Login"}
        </Link>
      </div>
    </div>
  );
};

export default Header;
