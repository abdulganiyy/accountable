"use client";
import React, { FC, useState, useEffect } from "react";
import Button from "@/components/buttons/Button";
import Image from "next/image";
import {
  PaperPlaneTilt,
  Lightning,
  ArrowUp,
  CaretDown,
  DotsThreeVertical,
  CaretLeft,
  CaretRight,
  Eye,
  DownloadSimple,
  Gift,
  MagnifyingGlass,
  Faders,
} from "@phosphor-icons/react";
import { Portal } from "@/components/Portal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextInput from "@/components/inputs/TextInput";
import { ToastContainer, toast } from "react-toastify";
import { SENDREFERRAL } from "@/graphql/mutations";
import { REFERRALS, REFERRAL_SUMMARY } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import moment from "moment";
import { twMerge } from "tailwind-merge";

// interface ReportProps {
//   name?: string;
//   dueDate?: string;
//   status?: string;
//   id?: string;
// }

// interface ActivityProps {
//   item?: any;
// }

const Referral = ({ item }: any) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();

  return (
    <tr className="border-b-[#E6E6E6] border-[1px] bg-white">
      <td className="px-6 py-4 text-left">
        {item?.name || "Chukwuemeka Ezechuckwu"}
      </td>
      <td className="px-6 py-4 text-left">
        {item?.email || `chukwuemeka@example.com`}
      </td>
      <td className="px-6 py-4 text-left">
        {item?.createdAt?.slice(0, 10) || `2023-05-01`}
      </td>
      <td className="px-6 py-4 text-left">
        {item?.signedUp?.slice(0, 10) || `2023-05-01`}
      </td>
      <td className="px-6 py-4 text-left">
        <div
          className={twMerge(
            `flex gap-x-2 items-center bg-[#ECFDF3] text-[#039855] rounded-[20px] py-1 px-3`,
            item?.status === "PENDING" && "bg-[#F9F9F9] text-[#414141]"
          )}
        >
          <span
            className={twMerge(
              `w-[8px] h-[8px] bg-[#039855] rounded-full flex justify-center items-center`,
              item?.status === "PENDING" && "bg-[#414141]"
            )}
          ></span>
          <div>
            {`${item?.status[0].toUpperCase()}${item?.status
              .slice(1)
              .toLowerCase()}`}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-left">
        <span className="relative">
          <DotsThreeVertical
            className="cursor-pointer"
            size={32}
            onClick={() => setShowDropdown(false)}
          />
          {showDropdown && (
            <div className="absolute p-3 z-50 bg-white border-[1px] border-[#E6E6E6] right-0 top-full w-[241px] h-auto rounded-[8px] overflow-hidden flex flex-col gap-y-3">
              <div
                onClick={() => {
                  //   router.push(`/dashboard/reports/${item?.id}`);
                }}
                className="cursor-pointer flex gap-x-3 items-center"
              >
                <Eye /> View
              </div>
              <a
                // href={item?.files[0]?.url}
                target="_blank"
                rel="noopener"
                className="cursor-pointer flex gap-x-3 items-center"
              >
                <DownloadSimple /> Download
              </a>
            </div>
          )}
        </span>
      </td>
    </tr>
  );
};

const schema = yup.object({
  name: yup.string().required("Value is mendatory"),
  email: yup.string().email().required("Value is mendatory"),
  note: yup.string(),
});

const Page = () => {
  const [inviteUser, setInviteUser] = useState(false);
  const [inviteUserSuccess, setInviteUserSuccess] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [summary, setSummary] = useState<any>(null);
  const [referrals, setReferrals] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(0);
  const [referralName, setReferralName] = useState<any>("");

  const {
    watch,
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const [sendReferral, result] = useMutation(SENDREFERRAL);

  useEffect(() => {
    console.log(result.data?.sendReferral);

    if (result.data?.sendReferral?.code) {
      // reset();
      toast.error(result.data?.sendReferral?.message);
    } else if (result.data?.sendReferral?.data?.id) {
      console.log(result.data?.sendReferral?.data?.id);
      reset();
      setInviteUser(false);
      setInviteUserSuccess(true);
      // router.push(`/passwordlink?email=${result.data?.register?.data?.email}`);
    }
  }, [result.data, reset]);

  const resp = useQuery(REFERRALS, {
    variables: {
      input: { limit: 10, page, paginate: true },
    },
  });

  // const router = useRouter();

  useEffect(() => {
    if (resp.data?.referrals?.code) {
      toast.error(resp.data?.referrals?.message);
    } else if (resp.data?.referrals?.data) {
      console.log(resp.data?.referrals?.data);
      setReferrals(resp.data?.referrals?.data);
      console.log(resp.data?.referrals?.pagination);
      setPages(resp.data?.referrals?.pagination?.pages);
    }
  }, [resp.data]);

  const res = useQuery(REFERRAL_SUMMARY, {
    variables: {
      input: { year: moment().year() },
    },
  });

  useEffect(() => {
    if (res.data?.referralSummary?.code) {
      toast.error(res.data?.referralSummary?.message);
    } else if (res.data?.referralSummary?.data) {
      console.log(res.data?.referralSummary?.data);
      setSummary(res.data?.referralSummary?.data);
    }
  }, [res.data]);

  const onSubmit = async (data: any) => {
    console.log(data);
    sendReferral({
      variables: {
        input: {
          email: data.email,
          name: data.name,
          note: data.note,
          // recipient: "64891480434ce1b0d1e5a819",
        },
      },
    });

    setReferralName(data?.name);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h3 className="font-extrabold text-[28px] leading-[42px] text-[#060809]">
            Refer and earn
          </h3>
          <p className="text-[#414141] text-[18px] leading-[28px]">
            Share your referral link with your friends to earn a free
            subscription
          </p>
        </div>

        <Button
          onClick={() => {
            setInviteUser(true);
          }}
          className="w-[156px]"
        >
          Share link by mail
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-[634px,1fr] gap-x-6">
        <div>
          <div className="bg-white border-[1px] border-[#E6E6E6] rounded-2xl">
            <div className="h-[52px] flex justify-between items-center px-6 border-b-[1px] border-[#EAEDEF]">
              <span>Referral Invite Summary</span>

              {/* <button
              onClick={() => {}}
              className="w-[213px] bg-[#071A7E] text-white py-2 px-4 rounded-[4px] font-medium text-[14px] leading-[20px] h-[36px]"
            >
            </button> */}
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-x-6">
                <div className="border-[1px] border-[#E6E6E6] rounded-[16px] bg-[#E6E6E6]">
                  <div className="py-8 px-6 rounded-t-[16px] flex flex-col gap-y-3 h-[93%] bg-white">
                    <span className="bg-[#F2F3F7] p-[6px] w-[32px] h-[32px] flex items-center justify-center rounded-[8px]">
                      <PaperPlaneTilt size={20} />
                    </span>
                    <span className="font-medium text-[14px] leading-[20px] text-[#4C5259] flex items-center gap-x-1">
                      Total Invites
                    </span>
                    <span className="font-semibold text-[24px] leading-[35px] text-[#021645]">
                      {summary?.totalInvites || "150"}
                    </span>
                  </div>
                </div>
                <div className="border-[1px] border-[#E6E6E6] rounded-[16px] bg-[#E6E6E6]">
                  <div className="py-8 px-6 rounded-t-[16px] flex flex-col gap-y-3 h-[93%] bg-white">
                    <span className="bg-[#F2F3F7] p-[6px] w-[32px] h-[32px] flex items-center justify-center rounded-[8px]">
                      <Lightning size={20} />
                    </span>
                    <span className="font-medium text-[14px] leading-[20px] text-[#4C5259] flex items-center gap-x-1">
                      Active Invites
                    </span>
                    <span className="font-semibold text-[24px] leading-[35px] text-[#021645]">
                      {summary?.activeInvites || "0"}
                    </span>
                  </div>
                </div>
                <div className="border-[1px] border-[#E6E6E6] rounded-[16px] bg-[#E6E6E6]">
                  <div className="py-8 px-6 rounded-t-[16px] flex flex-col gap-y-3 h-[93%] bg-white">
                    <span className="bg-[#F2F3F7] p-[6px] w-[32px] h-[32px] flex items-center justify-center rounded-[8px]">
                      <Gift size={20} />
                    </span>
                    <span className="font-medium text-[14px] leading-[20px] text-[#4C5259] flex items-center gap-x-1">
                      Earned Gifts
                    </span>
                    <span className="font-semibold text-[24px] leading-[35px] text-[#021645]">
                      {summary?.earnedGifts || "0"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="gap-x-2 p-4 border-[1px] border-[1px] border-[#B3B5CE] border-dashed rounded-[4px]">
            <div className="flex justify-between gap-x-[58px]">
              <div>
                <div className="font-medium text-[18px] leading-[36px] text-[#1C1C1C]">
                  Unlock Gifts by inviting people
                </div>
                <div className="max-w-[301px] font-medium text-[14px] leading-[20.3px] text-[#4C5259]">
                  Get a free one-month subscription once 20 people you refer
                  have subscribed.
                </div>
              </div>
              <span>
                {" "}
                <Image
                  alt="logo dashboard"
                  src="/vault.svg"
                  height={72}
                  width={72}
                />
              </span>
            </div>
            <div className="mt-8">
              <div className="text-[#04050F] font-medium text-[14px] leading-[20.3px]">
                YOUR PROGRESS
              </div>
              <div className="mt-2 flex flex-col gap-y-4">
                <div className="flex justify-between">
                  <div className="text-[#021645] font-medium text-[24px] leading-[35px]">
                    {summary?.activeInvites || "0"}/20
                  </div>
                  <div>
                    <Gift size={32} />
                  </div>
                </div>
                <div className="h-1 w-full bg-[#E5E6EF] relative">
                  <div className="w-[24px] h-[24px] rounded-full bg-[#E5E6EF] absolute right-0 -top-[12px] z-10"></div>
                  <div className="bg-[#B3B5CE] h-[42px] w-[1px] absolute right-3 -top-[21px]"></div>
                  <div
                    className="h-1 bg-[#00085A] relative"
                    style={{ width: `${(summary?.earnedGifts / 20) * 100}%` }}
                  >
                    <div className="w-[24px] h-[24px] rounded-full bg-[#E5E6EF] absolute right-0 -top-[12px]"></div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-[#00085A] font-medium text-[14px] leading-[20.3px]">
                    PAID INVITES
                  </div>
                  <div className="text-[#060809] font-medium text-[14px] leading-[20.3px] pr-1">
                    20
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-[#F8F9FE] border-[1px] border-[#E6E6E6] rounded-2xl">
        <div className="h-[89px] flex bg-white justify-between items-center px-6 border-b-[1px] border-[#EAEDEF]">
          <span>List of Referrals</span>
          <div className="flex gap-x-2 items-center">
            <div className="bg-black/5 w-[289px] h-[36px] rounded-md flex items-center gap-x-1 px-2">
              <MagnifyingGlass color="#06080933" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none placeholder:text-[#06080933]"
                placeholder="Search referrals"
              />
            </div>
            <button
              onClick={() => {}}
              className="border-[2px] border-[#EAEDEF] bg-white text-[#585858] py-2 px-4 rounded-[4px] font-medium text-[14px] leading-[20px] h-[36px] flex items-center gap-x-1"
            >
              <Faders size={20} /> Filter by <CaretDown />
            </button>
          </div>
        </div>
        <div className="">
          <table className="w-full">
            <thead>
              <tr className="font-semibold bg-[#F9F9F9] text-[#414141] text-[14px] leading-[20px]">
                <th className="px-6 py-4 text-left">
                  <span className="flex items-center gap-x-1">
                    <span>NAME</span>
                    <ArrowUp size={16} />
                  </span>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="flex items-center gap-x-1">
                    <span>EMAIL</span>
                    <ArrowUp size={16} />
                  </span>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="flex items-center gap-x-1">
                    <span>DATE SENT</span>
                    <ArrowUp size={16} />
                  </span>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="flex items-center gap-x-1">
                    <span>SIGNED UP ON</span>
                    <ArrowUp size={16} />
                  </span>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="flex items-center gap-x-1">
                    <span>STATUS</span>
                    <ArrowUp size={16} />
                  </span>
                </th>
                {/* <th className="px-6 py-4 text-left">
                      <span className="flex items-center gap-x-1">
                        <span>STATUS</span>
                        <ArrowUp size={16} />
                      </span>
                    </th> */}
                <th className="px-6 py-4 text-left">
                  {/* <span className="flex items-center gap-x-1">
                    <span>FILE NAME</span>
                    <ArrowUp size={16} />
                  </span> */}
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {new Array(9).fill(0).map((item: any, i: number) => (
                <Referral item={item} key={i} />
              ))} */}
              {referrals?.length !== 0 &&
                referrals?.map((item: any, i: number) => (
                  <Referral item={item} key={i} />
                ))}
            </tbody>
          </table>
          <div className="p-6 flex justify-between items-center">
            <div className="text-[#414141] text-[14px] leading-[20px]">
              Showing {`${(page - 1) * 10 + referrals?.length}`} out of{" "}
              <span className="font-semibold">{pages * 10} results</span>
            </div>
            <div className="flex justify-between items-center gap-x-3">
              <span
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                  }
                }}
                className="cursor-pointer border-[1px] border-[#F2F4F7] p-[6px] w-[36px] h-[36px] flex items-center justify-center rounded-[6px]"
              >
                <CaretLeft size={20} />
              </span>
              {pages >= 1 &&
                new Array(pages).fill(null).map((_, i: number) => {
                  return (
                    <span
                      key={i}
                      onClick={() => {
                        if (page === i + 1) return;

                        setPage(i + 1);
                      }}
                      className={twMerge(
                        `cursor-pointer text-[#A0A0A0]`,
                        page === i + 1 &&
                          "bg-[#666B9C] p-[6px] w-[36px] h-[36px] rounded-full flex items-center justify-center text-white"
                      )}
                    >
                      {i + 1}
                    </span>
                  );
                })}

              <span
                onClick={() => {
                  if (page < pages) {
                    setPage(page + 1);
                  }
                }}
                className="cursor-pointer border-[1px] border-[#F2F4F7] p-[6px] w-[36px] h-[36px] flex items-center justify-center rounded-[6px]"
              >
                <CaretRight size={20} />
              </span>
            </div>
          </div>
        </div>
      </div>
      {inviteUser && (
        <Portal
          onClose={() => {
            setInviteUser(false);
          }}
        >
          <div className="w-[546px] bg-white rounded-[16px] flex flex-col">
            <div className="h-[60px] px-6 py-4 border-b-[1px] border-[#0000001F] font-semibold	text-[20px] leading-[28px]">
              Share referral link
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-6 py-4 overflow-y-auto">
                <div className="flex flex-col gap-y-4 w-full">
                  <TextInput
                    label="Name of invitee"
                    name="name"
                    placeholder="David"
                    register={register}
                    errorMessage={errors?.name?.message}
                  />
                  <TextInput
                    label="Email address"
                    name="email"
                    placeholder="name@example.com"
                    register={register}
                    errorMessage={errors?.email?.message}
                  />
                  <TextInput
                    label="Add note"
                    name="note"
                    placeholder="optional"
                    register={register}
                  />
                </div>
              </div>
              <div className="w-full rounded-b-[16px] bg-[#F2F3F7] flex justify-end gap-x-2 mt-5 px-6 py-4 pb-8">
                <Button
                  type="button"
                  onClick={() => {
                    setInviteUser(false);
                  }}
                  className="w-[207px] bg-white text-[#071A7E] border-[2px] border-[#EAEDEF]"
                >
                  Cancel
                </Button>
                <Button
                  isLoading={result.loading}
                  type="submit"
                  className="w-[176px]"
                >
                  Send referral
                </Button>
              </div>
            </form>
          </div>
        </Portal>
      )}
      {inviteUserSuccess && (
        <Portal
          onClose={() => {
            setInviteUserSuccess(false);
          }}
        >
          <div className="bg-white h-[388px] w-[517px] rounded-[16px]">
            <div className="flex flex-col pt-[65px] gap-y-4 items-center h-full">
              <Image src="/verify-icon.svg" alt="Logo" width={72} height={72} />
              <div className="mt-[32px] text-[#060809] font-smibold text-[20px] leading-[28px]">
                Invite Sent
              </div>
              <div className="max-w-[278px] mb-4 text-center text-[#04050F] font-normal text-[16px] leading-[24px]">
                You have successfully invited “{`${referralName}`}” to join
                Accountable
              </div>
              <div className="flex gap-x-2">
                <Button
                  type="button"
                  className="w-[175px]  bg-white text-[#071A7E] border-[2px] border-[#EAEDEF]"
                  onClick={() => {
                    setInviteUserSuccess(false);
                  }}
                >
                  Back to dashboard
                </Button>
              </div>
            </div>
          </div>
        </Portal>
      )}
      <ToastContainer />
    </div>
  );
};

export default Page;
