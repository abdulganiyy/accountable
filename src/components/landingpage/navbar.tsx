import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import logo from "../assets/Frame 51logo-blue.svg";
// import cursor from "../assets/Cursor click.svg";
// import chartBar from "../assets/Chart bar.svg";
// import chevronDown from "../assets/Chevron down.svg";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [solutionsDropdown, setSolutionsDropdown] = useState(false);

  return (
    <nav className="bg-white border-gray-200 border-b ">
      <div className="max-w-screen-xl 2xl:max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4 ">
        <a href="#" className="flex items-center">
          <Image
            src={"/Frame 51logo-blue.svg"}
            width={0}
            height={0}
            className="h-8 mr-3 xl:w-[9.5vw] xl:h-auto"
            alt="Accountable Logo"
          />
        </a>

        {/* mobile nav */}
        <div className="flex lg:hidden items-center md:border-l md:pl-8 md:gap-4 md:order-2">
          <Link
            href="/login"
            className="hidden md:block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#03045E] md:p-0  "
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="text-white bg-[#03045E] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 "
          >
            Sign up
          </Link>
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-cta"
            aria-expanded="false"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            isOpen ? "block" : "hidden"
          } w-full  md:w-auto md:order-1 md:hidden `}
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white   ">
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-white bg-[#03045E] rounded md:bg-transparent md:text-[#03045E] md:p-0"
                aria-current="page"
              >
                Solutions
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#03045E] md:p-0  "
              >
                About us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#03045E] md:p-0 "
              >
                Resources
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#03045E] md:p-0 "
              >
                Pricing
              </a>
            </li>
          </ul>
        </div>

        {/* navbar for md upwards */}
        <div className="relative hidden lg:flex items-center gap-4 lg:gap-8 xl:gap-[2.2vw] ">
          <div className="flex items-center md:border-l pl-4 lg:pl-8 xl:pl-[2.2vw] md:gap-4 xl:gap-[1.1vw] md:order-2">
            <Link
              href="/login"
              className="hidden md:block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#03045E] xl:text-[1.1vw] md:p-0  "
            >
              Log in
            </Link>

            <Link
              href="/signup"
              className="text-white bg-[#03045E] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm xl:text-[0.97vw] px-4 py-2 xl:px-[1.1vw] xl:py-[0.6vw] text-center mr-3 md:mr-0 "
            >
              Sign up
            </Link>
          </div>
          <div
            className={`items-center justify-between ${
              isOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1 `}
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 xl:space-x-[2.2vw] md:mt-0 md:border-0 md:bg-white xl:text-[1.1vw]   ">
              <li
                className="flex items-center"
                onClick={() => setSolutionsDropdown(!solutionsDropdown)}
              >
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#03045E] md:p-0 "
                >
                  Solutions
                </a>
                <Image
                  src={"/Chevron down.svg"}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  alt=""
                />
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#03045E] md:p-0  "
                >
                  About us
                </a>
              </li>
              <li className="flex items-center">
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#03045E] md:p-0 "
                >
                  Resources
                </a>
                <Image
                  src={"/Chevron down.svg"}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  alt=""
                />
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#03045E] md:p-0 "
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* dropdown */}
          {solutionsDropdown && (
            <div className=" mt-1 w-full border-gray-200 shadow-sm bg-gray-50 md:bg-white border rounded-lg absolute top-[100%] left-0 ">
              <div className="grid  px-2 py-5 mx-auto text-gray-900  sm:grid-cols-2 md:px-2 md:py-2 ">
                <ul>
                  <li className="flex items-start rounded-lg hover:bg-gray-100 gap-3 p-3">
                    <Image
                      src={"/Chart bar.svg"}
                      width={24}
                      height={24}
                      // sizes="100vw"
                      // style={{ width: "100%", height: "auto" }}
                      alt=""
                    />
                    <a href="#" className="block  ">
                      <div className="font-semibold">Monthly Bookkeeping</div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Get a better understanding of where your traffic is
                        coming from.
                      </span>
                    </a>
                  </li>
                  <li className="flex items-start rounded-lg hover:bg-gray-100 gap-3 p-3">
                    <Image
                      src={"/Cursor click.svg"}
                      width={24}
                      height={24}
                      // sizes="100vw"
                      // style={{ width: "100%", height: "auto" }}
                      alt=""
                    />
                    <a href="#" className="block">
                      <div className="font-semibold">Tax Filing</div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Speak directly to your customers in a more meaningful
                        way.
                      </span>
                    </a>
                  </li>
                </ul>
                <ul>
                  <li className="flex items-start rounded-lg hover:bg-gray-100 gap-3 p-3">
                    <Image
                      src={"/Chart bar.svg"}
                      width={24}
                      height={24}
                      // sizes="100vw"
                      // style={{ width: "100%", height: "auto" }}
                      alt=""
                    />
                    <a href="#" className="block">
                      <div className="font-semibold">Process Improvement</div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Get a better understanding of where your traffic is
                        coming from.
                      </span>
                    </a>
                  </li>
                  <li className="flex items-start rounded-lg hover:bg-gray-100 gap-3 p-3">
                    <Image
                      src={"/Cursor click.svg"}
                      width={24}
                      height={24}
                      // sizes="100vw"
                      // style={{ width: "100%", height: "auto" }}
                      alt=""
                    />
                    <a href="#" className="block">
                      <div className="font-semibold">FMCC</div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Speak directly to your customers in a more meaningful
                        way.
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex w-full items-start hover:bg-gray-100 gap-3 p-6 ">
                <a href="#" className="block  ">
                  <div className="font-semibold">
                    Accounting For Creatives{" "}
                    <span className="px-3 py-1 rounded-full text-sm xl:text-[0.97vw] bg-[#E0E7FF]">
                      New
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Unleash your creative career with our tailored financial
                    service.
                  </span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
