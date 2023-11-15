"use client";
import { ReactNode, FC, useEffect, useState } from "react";
import {
  HouseSimple,
  CalendarBlank,
  Cardholder,
  ChatDots,
  ChartPieSlice,
  Faders,
  Gift,
  Question,
  SignOut,
  Sun,
  Gear,
  Bell,
  SidebarSimple,
  MagnifyingGlass,
  Star,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries";
import { BeatLoader } from "react-spinners";

// import useUser from "@/hooks/useUser";
// import { useSession, signIn, signOut } from "next-auth/react";
// import { decode } from "jsonwebtoken";

interface MenuLinkProps {
  children: ReactNode;
  active?: boolean;
  href: string;
}

const MenuLink: FC<MenuLinkProps> = ({ children, active, href }) => {
  return (
    <Link
      href={href}
      className={`relative flex gap-x-1 px-[14.5px] py-2.5 items-center h-[28px] rounded-md ${
        active ? "bg-[#071A7E0D] text-[#071A7E]" : ""
      }`}
    >
      {children}
      {active && (
        <span className="absolute w-1 h-4 left-0 bg-[#071A7E] rounded-[3px]"></span>
      )}
    </Link>
  );
};

export default function Layout({ children }: { children: ReactNode }) {
  const pathName = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  // const { data, status } = useSession();

  // console.log(data);

  // console.log(
  //   apiCalendar.tokenClient.requestAccessToken({ prompt: "consent" })
  // );

  const { loading, data, error } = useQuery(GET_USER);

  useEffect(() => {
    // console.log(data);
    if (data?.user?.code) {
      console.log(data?.user?.code);
      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");
      router.push("/login");
    } else if (data?.user?.data) {
      console.log(data?.user?.data);
      setUser(data.user.data);
    }
  }, [data]);

  // useEffect(() => {
  //   const storedUser = localStorage?.getItem("userData");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  // useEffect(() => {
  //   const token = localStorage?.getItem("userToken");

  //   // console.log(token);

  //   if (token) {
  //     // setUser(JSON.parse(token));
  //     // let decodedToken = decode(token, { complete: true });
  //     // let dateNow = new Date();
  //     // console.log(decodedToken);
  //     //@ts-ignore
  //     // if (decodedToken?.payload?.exp < dateNow.getTime()) {
  //     //   localStorage.removeItem("userToken");
  //     //   localStorage.removeItem("userData");
  //     //   router.push("/login");
  //     // }
  //   } else if (!token) {
  //     localStorage.removeItem("userToken");
  //     localStorage.removeItem("userData");
  //     router.push("/login");
  //   }
  // }, [router]);

  if (loading)
    <div className="h-screen flex justify-center items-center">
      <BeatLoader />
    </div>;

  return (
    <div className="h-screen grid grid-cols-[212px,1fr]">
      <div className="w-[212px] p-4 h-screen border-r-[1px] border-[#E6E6E6] overflow-scroll">
        <div className="flex justify-between items-center">
          <Image
            alt="logo dashboard"
            src="/logomain.svg"
            height={55}
            width={55}
          />
          <SidebarSimple size={20} />
        </div>
        <div className="mt-10 flex flex-col gap-y-4">
          <MenuLink
            href="/dashboard"
            active={pathName === "/dashboard" && true}
          >
            <HouseSimple size={20} /> Dashboard
          </MenuLink>
          <MenuLink
            href="/dashboard/accounting"
            active={pathName === "/dashboard/accounting" && true}
          >
            <Cardholder size={20} /> Accounting
          </MenuLink>
          <MenuLink
            href="/dashboard/meeting"
            active={pathName === "/dashboard/meeting" && true}
          >
            <CalendarBlank size={20} /> Meeting
          </MenuLink>
          <MenuLink
            href="/dashboard/messages"
            active={pathName === "/dashboard/messages" && true}
          >
            <ChatDots size={20} /> Messages
          </MenuLink>
          {/* <MenuLink
            href="/dashboard/reports"
            active={pathName === "/dashboard/reports" && true}
          >
            <ChartPieSlice size={20} /> Reports
          </MenuLink> */}
          <MenuLink
            href="/dashboard/services"
            active={pathName === "/dashboard/services" && true}
          >
            <Star size={20} /> Services
          </MenuLink>
          {/* <MenuLink
            href="/dashboard/tools"
            active={pathName === "/dashboard/tools" && true}
          >
            <Faders size={20} /> Tools
          </MenuLink> */}
        </div>
        <div className="mt-10 flex flex-col gap-y-4 mt-[132px]">
          <MenuLink
            href="/dashboard/referrals"
            active={pathName === "/dashboard/referrals" && true}
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
        </div>
        <div className="flex items-end mt-10 gap-x-3">
          <span className="font-migra text-[32px] leading-[.32px] w-[40px] h-[40px] flex items-center justify-center bg-[#FAEAD4] ">
            {user?.firstName?.substring(0, 1)}
          </span>
          <div className="flex flex-col">
            <span className="font-medium text-[14px] leading-[21px]">
              {user?.firstName || `Chris`}
            </span>
            <span className="text-[12px] leading-[14px] font-light text-[#555555]">
              {user?.companyName || ` Nguvu Health LLC`}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full h-screen bg-[#FAFBFC] overflow-auto">
        <div className="bg-white w-full h-[72px] flex items-center justify-between px-12">
          <span className="text-black/40 capitalize">
            {pathName?.substring(1).split("/")[1] || pathName?.substring(1)}
          </span>
          <div className="bg-black/5 w-[289px] h-[26px] rounded-md flex items-center gap-x-1 px-2">
            <MagnifyingGlass color="#06080933" />
            <input
              className="bg-transparent outline-none placeholder:text-[#06080933]"
              placeholder="Search"
            />
          </div>
          <div className="flex gap-x-3 items-center">
            <Link
              href="/dashboard/meeting"
              className="border-[1px] border-[#EAEDEF] flex gap-x-1 h-[36px] justify-center px-2 rounded-[4px] mr-3 items-center text-[#071A7E]"
            >
              <CalendarBlank /> Meetings
            </Link>
            {/* {status === "loading" ? (
              <span>Loading</span>
            ) : status === "unauthenticated" ? (
              <button
                onClick={() => {
                  // apiCalendar.handleAuthClick();
                  signIn();
                }}
              >
                Synchronize Calendar
              </button>
            ) : (
              <button
                onClick={() => {
                  // apiCalendar.handleAuthClick();
                  signOut();
                }}
              >
                Remove Calendar
              </button>
            )} */}
            <div className="border-l-[1px] border-l-[#060809] flex gap-x-3 h-[28px] w-[100px] justify-center items-center">
              <Sun />
              <Gear />
              <Bell />
            </div>
          </div>
        </div>
        <div
          className={twMerge(
            `px-12 py-7`,
            pathName?.substring(1).split("/")[1] === "messages" && "px-0 py-0"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
