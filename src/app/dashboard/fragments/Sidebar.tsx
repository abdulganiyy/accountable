"use client";
import { ReactNode, FC, useState } from "react";
import {
  HouseSimple,
  CalendarBlank,
  Cardholder,
  ChatDots,
  Gift,
  SignOut,
  SidebarSimple,
  Star,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries";


interface MenuLinkProps {
  children: ReactNode;
  active?: boolean;
  href: string;
  onClick?: () => void
}

const MenuLink: FC<MenuLinkProps> = ({ children, active, href,onClick }) => {
  return (
    <Link
      href={href}
      className={`relative flex gap-x-1 px-[14.5px] py-2.5 items-center h-[28px] rounded-md ${
        active ? "bg-[#071A7E0D] text-[#071A7E]" : ""
        }`}
      onClick={onClick}
    >
      {children}
      {active && (
        <span className="absolute w-1 h-4 left-0 bg-[#071A7E] rounded-[3px]"></span>
      )}
    </Link>
  );
};
const Sidebar = ({ showNav,setShowNav }: { showNav: boolean, setShowNav: (showNav: boolean)=>void }) => {
  const pathName = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
    const { loading, data, error } = useQuery(GET_USER, {
      onCompleted(data) {
        setUser(data?.user?.data);
      },
      onError(error) {
        console.log(error);
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
        router.push("/login");
      },
    });
  
  
  return (
    <div
      className={`min-w-[212px] lg:min-w-[180px] xl:min-w-[212px] 2xl:w-[250px] px-4 h-screen border-r-[1px] border-[#E6E6E6] bg-white z-50 transition-all duration-300 absolute lg:static ${
        showNav ? "block " : "hidden lg:block"
      }`}
    >
      <div className="flex justify-between items-center mt-4">
        <Image
          alt="logo dashboard"
          src="/logomain.svg"
          height={55}
          width={55}
        />
        <SidebarSimple size={20} onClick={() => setShowNav(!showNav)} />
      </div>
      <div className="mt-10 flex flex-col justify-between items-center h-[80%]">
        <div className=" flex flex-col gap-y-4">
          <MenuLink
            href="/dashboard"
            active={pathName === "/dashboard" && true}
            onClick={() => setShowNav(!showNav)}
          >
            <HouseSimple size={20} /> Dashboard
          </MenuLink>
          <MenuLink
            href="/dashboard/accounting"
            active={pathName === "/dashboard/accounting" && true}
            onClick={() => setShowNav(!showNav)}
          >
            <Cardholder size={20} /> Accounting
          </MenuLink>
          <MenuLink
            href="/dashboard/meeting"
            active={pathName === "/dashboard/meeting" && true}
            onClick={() => setShowNav(!showNav)}
          >
            <CalendarBlank size={20} /> Meeting
          </MenuLink>
          <MenuLink
            href="/dashboard/messages"
            active={pathName === "/dashboard/messages" && true}
            onClick={() => setShowNav(!showNav)}
          >
            <ChatDots size={20} /> Messages
          </MenuLink>
          <MenuLink
            href="/dashboard/services"
            active={pathName === "/dashboard/services" && true}
            onClick={() => setShowNav(!showNav)}
          >
            <Star size={20} /> Services
          </MenuLink>
        </div>
        <div className=" flex flex-col gap-y-4">
          <MenuLink
            href="/dashboard/referrals"
            active={pathName === "/dashboard/referrals" && true}
            onClick={() => setShowNav(!showNav)}
          >
            <Gift size={20} /> Refer & Earn
          </MenuLink>
          {/* <MenuLink
            href="/dashboard/accounting"
            active={pathName === "/dashboard/help" && true}
          >
            <Question size={20} /> Help & Support
          </MenuLink> */}
          {/* <MenuLink
            href="/dashboard/meeting"
            active={pathName === "/dashboard/logout" && true}
          >
            <AiOutlineCalendar /> Log out
          </MenuLink> */}
          <span
            onClick={() => {
              localStorage.removeItem("userToken");
              localStorage.removeItem("userData");
              router.push("/login");
            }}
            className="cursor-pointer relative flex gap-x-1 px-[14.5px] py-2.5 items-center h-[28px] rounded-md"
          >
            <SignOut size={20} /> Log out
          </span>
          <div className="flex items-end mt-10 gap-x-3">
            <span className="font-migra text-[32px] leading-[.32px] w-[40px] h-[40px] flex items-center justify-center bg-[#FAEAD4] ">
              {user?.firstName?.substring(0, 1) || ""}
            </span>
            <div className="flex flex-col">
              <span className="font-medium text-[14px] leading-[21px]">
                {user?.firstName || "Welcome"}
              </span>
              <span className="text-[12px] leading-[14px] font-light text-[#555555]">
                {user?.companyName || ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
