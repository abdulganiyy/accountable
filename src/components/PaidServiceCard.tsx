import React, { FC, useState } from "react";
import { BookOpen, ArrowSquareOut } from "@phosphor-icons/react";

interface PaidServiceCardProps {
  item: { [index: string]: any };
  setChooseService: (val: any) => void;
  setPickedServices: () => void;
}

const PaidServiceCard: FC<PaidServiceCardProps> = ({
  item,
  setChooseService,
  setPickedServices,
}) => {
  const {
    status = item?.active ? "active" : item?.expired ? "expired" : "processing",
    service: { name, description },
    createdAt,
    frequency,
    recurring,
    expiredAt,
    expired,
  } = item;

  const cls: { [index: string]: unknown } = {
    expired: "bg-[#FEF3F2] text-[#D92D20]",
    processing: "bg-[#F2F3F7] text-[#33397B]",
    active: "bg-[#ECFDF3] text-[#039855]",
  };

  const clss: { [index: string]: unknown } = {
    expired: "bg-[#D92D20]",
    processing: "bg-[#33397B]",
    active: "bg-[#039855]",
  };

  // const options = {
  //   year: '2-digit',
  //   month: '2-digit',
  //   day: '2-digit'
  // };

  return (
    <div className="px-5 py-6 border-[#E6E6E6] border-[1px] rounded-[16px] bg-white col-span-full md:col-span-1 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center">
          <span className="w-[40px] h-[40px] flex rounded-full items-center justify-center bg-[#FEF3F2]">
            <BookOpen size={20} />
          </span>
          <div
            className={`flex py-1 px-3 gap-2 h-[28px items-center justify-center] rounded-[20px] ${cls[status]}`}
          >
            <span
              className={`w-[8px] h-[8px] flex rounded-full inline ${clss[status]}`}
            ></span>
            {status}
          </div>
        </div>
        <div className="mt-3 flex flex-col gap-y-1">
          <div className="font-medium text-[16px] leading-[23px] text-[#1C1C1C]">
            {name}
          </div>
          <div className="text-[12px] leading-[17px] text-[#3B3C41]">
            {description}
          </div>
        </div>
        <div className="mt-3 flex items-center text-[#00085A] text-[12px] leading-[17px] font-medium">
          <span>See more details</span>
          <ArrowSquareOut />
        </div>
        <div className="mt-5 flex flex-col gap-y-1">
          <span className="text-[12px] leading-[17px] text-[#4C5259]">
            Payment type
          </span>
          <span className="font-medium text-[14px] leading-[20px] text-[#414141] capitalize">
            {recurring ? "Recurring" : "One Time"}
          </span>
        </div>
        <div className="mt-4 flex gap-x-10 items-center">
          {/* <table>
          <tbody>
            <tr>
              <td className="align-left">d</td>
              <td className="align-left">v</td>
            </tr>
          </tbody>
        </table> */}
          <div className="mt-5 flex flex-col gap-y-1">
            <span className="text-[12px] leading-[17px] text-[#4C5259]">
              Purchased on
            </span>
            <span className="font-medium text-[14px] leading-[20px] text-[#414141]">
              {new Intl.DateTimeFormat("en-US", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
              }).format(new Date(createdAt)) || `23/04/23`}
            </span>
          </div>
          <div className="mt-5 flex flex-col gap-y-1">
            <span className="text-[12px] leading-[17px] text-[#4C5259]">
              Next due
            </span>
            <span className="font-medium text-[14px] leading-[20px] text-[#414141]">
              {expiredAt
                ? new Intl.DateTimeFormat("en-US", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  }).format(new Date(expiredAt))
                : `-`}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        {!expired ? null : (
          <button
            onClick={() => {
              setChooseService(true);
              setPickedServices();
            }}
            className="w-full bg-white border-[1px] border-[#7D839866] text-[#414141] py-2 px-4 rounded-[4px] font-medium text-[14px] leading-[20px] h-[36px] "
          >
            Renew Plan
          </button>
        )}
      </div>
    </div>
  );
};

export default PaidServiceCard;
