"use client";
import { ReactNode, FC, useEffect, useState } from "react";
import {
  CalendarBlank,
  Sun,
  Gear,
  Bell,
  MagnifyingGlass,
  SidebarSimple,
} from "@phosphor-icons/react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./fragments/Sidebar";
import Image from "next/image";

// import useUser from "@/hooks/useUser";
// import { useSession, signIn, signOut } from "next-auth/react";
// import { decode } from "jsonwebtoken";

export default function Layout({ children }: { children: ReactNode }) {
  const pathName = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
    const [showNav, setShowNav] = useState(false);

  // const { data, status } = useSession();

  // console.log(data);

  // console.log(
  //   apiCalendar.tokenClient.requestAccessToken({ prompt: "consent" })
  // );

  // useEffect(() => {
  //   // console.log(data);
  //   if (data?.user?.code) {
  //     console.log(data?.user?.code);
  //     localStorage.removeItem("userToken");
  //     localStorage.removeItem("userData");
  //     router.push("/login");
  //   } else if (data?.user?.data) {
  //     console.log(data?.user?.data);
  //     setUser(data.user.data);
  //   }
  // }, [data]);

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

  return (
    <div className="h-screen flex ">
      <Sidebar showNav={showNav} setShowNav={setShowNav} />
      <div className="w-full h-screen bg-[#FAFBFC] overflow-auto col-span-9">
        <div className="bg-white w-full h-[72px] flex items-center justify-between flex-wrap px-4 lg:px-12">
          <div className="flex lg:hidden justify-between items-center gap-x-4">
            <Image
              alt="logo dashboard"
              src="/logomain.svg"
              height={55}
              width={55}
            />
            <SidebarSimple size={20} onClick={() => setShowNav(!showNav)} />
          </div>
          <span className="text-black/40 capitalize hidden md:block ">
            {pathName?.substring(1).split("/")[1] || pathName?.substring(1)}
          </span>
          <div className="bg-black/5 w-[289px] h-[26px] rounded-md items-center gap-x-1 px-2 hidden lg:flex">
            <MagnifyingGlass color="#06080933" />
            <input
              className="bg-transparent outline-none placeholder:text-[#06080933] "
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
            `px-4 py-4 xl:px-12 xl:py-7`,
            pathName?.substring(1).split("/")[1] === "messages" &&
              "px-0 py-0 xl:px-0 xl:py-0"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
