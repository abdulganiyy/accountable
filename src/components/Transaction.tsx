import React, { FC } from "react";
import { DotsThree } from "@phosphor-icons/react";
import { truncateStr } from "@/utils";

interface TransactionProps {
  amount?: string;
  description?: string;
  date?: string;
}

const Transaction: FC<TransactionProps> = ({
  amount = "$100,000,000",
  description = "Description will be written here",
  date = "10/10/2023",
}) => {
  return (
    <div className="flex justify-between items-center py-4 px-3 border-b-[1px] border-[#E7E7E7]">
      <span>
        <span className="flex flex-col gap-y-1">
          <span className="text-[#191919] font-medium text-[14px] leading-[20px]">
            {amount}
          </span>
          <span className="text-[#4C5259] text-[12px] leading-[16px]">
            {truncateStr(description, 30)}
          </span>
        </span>
      </span>
      <span>
        <span className="flex items-center gap-x-1">
          <span className="text-[#414141] text-[12px] leading-[16px]">
            {date}
          </span>
          <span>
            <DotsThree size={24} />
          </span>
        </span>
      </span>
    </div>
  );
};

export default Transaction;
