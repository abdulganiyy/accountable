import React, { useState, useEffect } from "react";
import { FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { GET_BANKS } from "@/graphql/queries";

import { twMerge } from "tailwind-merge";

const SearchBoxDropdown = ({ selectedBank, setSelectedBank }: any) => {
  const [searchText, setSearchText] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [banks, setBanks] = useState<any>([]);
  // const [bankName, setBankName] = useState<string>("");

  let filteredBanks = banks;

  if (searchText !== "" && banks?.length) {
    filteredBanks = filteredBanks.filter((bank: any) =>
      bank?.name?.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  // console.log(filteredBanks);

  // const banks = [
  //   { name: "Access Bank", logo: "/accessbanklogo.svg" },
  //   { name: "First Bank", logo: "/firstbanklogo.svg" },
  //   { name: "Guaranty Trust Bank", logo: "/gtbanklogo.svg" },
  //   { name: "Zenith Bank", logo: "/zenithbanklogo.svg" },
  //   // Add more banks here
  // ];

  const { loading, data, error } = useQuery(GET_BANKS, {
    variables: { input: { limit: 40, offset: 0 } },
  });

  useEffect(() => {
    console.log(data);
    setBanks(data?.accountLinkingBanks?.data?.results);
  }, [data]);

  const handleSearch = () => {
    // Handle search logic here
    console.log("Searching for:", searchText);
  };

  const handleInputChange = (event: any) => {
    setSearchText(event.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        className="w-full h-[48px] pl-[52px] pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Search banks"
      />
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 bg-[#F2F3F7] w-[32px] h-[32px] flex items-center justify-center rounded-[8px]"
        onClick={handleSearch}
      >
        <FaSearch />
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 bg-[#F2F3F7] w-[32px] h-[32px] flex items-center justify-center rounded-[8px]"
        onClick={toggleDropdown}
      >
        {isDropdownOpen ? <FaChevronDown /> : <FaChevronUp />}
      </button>
      {isDropdownOpen && (
        <div className="absolute top-[60px]">
          <div className="grid grid-cols-3 gap-4">
            {filteredBanks?.length &&
              filteredBanks?.slice(0, 10).map((bank: any, index: number) => (
                <div
                  onClick={() => setSelectedBank(bank)}
                  key={index}
                  className={twMerge(
                    `flex border-[1px] border-[#ECEEF0] h-[56px] px-2 gap-x-2 bg-[#F7F9FB] cursor-pointer items-center rounded-xl`,
                    selectedBank?.name === bank?.name && "border-[#999CBD]"
                  )}
                >
                  <Image
                    src={bank?.icon || "/verify-icon.svg"}
                    alt={bank?.name}
                    width={32}
                    height={32}
                  />
                  <span className="text-[#4C5259] text-[14px] leading-[17px]">
                    {bank?.name}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBoxDropdown;

// <div className="relative">
//         <button
//           className="p-2 rounded-lg text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           onClick={toggleDropdown}
//         >
//           {isDropdownOpen ? <FaChevronDown /> : <FaChevronRight />}
//         </button>
//         {isDropdownOpen && (
//           <ul className="absolute mt-2 py-1 px-2 bg-white border border-gray-300 rounded-lg">
//             <li className="py-1">Option 1</li>
//             <li className="py-1">Option 2</li>
//             <li className="py-1">Option 3</li>
//           </ul>
//         )}
//       </div>
