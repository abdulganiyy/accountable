import React, { FC, useState, useEffect, useCallback } from "react";
import { Portal } from "./Portal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CloudArrowUp, X } from "@phosphor-icons/react";
import Button from "./buttons/Button";
import Success from "./layouts/Success";
import SearchBoxDropdown from "./inputs/SearchBoxDropdown";
import Image from "next/image";
import { useMutation } from "@apollo/client";
const Okra = require("okra-js");
// import Okra from "okra-js";
const MonoConnect = require("@mono.co/connect.js");
import { saveToLocalStorage } from "@/utils";
import { toast, ToastContainer } from "react-toastify";
import { LINK_BANKS } from "@/graphql/mutations";

interface LinkBanksProps {
  onClose: () => void;
  successHandler: () => void;
}

// const schema = yup.object({
//   cardName: yup.string().required(),
//   cardDetails: yup.string().required(),
//   expiryDate: yup.string().required(),
//   cvv: yup.string().email().required(),
// });

const LinkBanks: FC<LinkBanksProps> = ({ onClose, successHandler }) => {
  const [linkBank, setLinkBank] = useState(true);
  const [linkBankSuccess, setLinkBankSuccess] = useState(false);
  const [selectedBank, setSelectedBank] = useState<any>(null);
  // const [scriptLoaded, setScriptLoaded] = useState(false);

  // const openMonoWidget = useCallback(async () => {
  //   const MonoConnect = (await require("@mono.co/connect.js")).default;

  //   const monoInstance = new MonoConnect({
  //     key: "test_pk_g280h7rx6ddmkkvu9nnu",
  //     onClose: () => console.log("Widget closed"),
  //     onLoad: () => setScriptLoaded(true),
  //     onSuccess: ({ code }: any) => console.log(`Linked successfully: ${code}`),
  //   });

  //   monoInstance.setup();
  //   monoInstance.open();
  // }, []);

  const [linkBanks, res] = useMutation(LINK_BANKS);

  useEffect(() => {
    if (res.data?.linkBankAccounts?.code) {
      //
      toast.error(res.data?.linkBankAccounts?.message);
    } else if (res.data?.linkBankAccounts?.data) {
      console.log(res.data?.linkBankAccounts?.data);
      setLinkBank(false);
      setLinkBankSuccess(true);
    }
  }, [res.data]);

  const monoConnect = React.useMemo(() => {
    const monoInstance = new MonoConnect({
      onClose: () => console.log("Widget closed"),
      onLoad: () => console.log("Widget loaded successfully"),
      onSuccess: async ({ code }: any) => {
        console.log(`Linked successfully: ${code}`);

        try {
          const authOptions = {
            method: "POST",
            headers: {
              accept: "application/json",
              "mono-sec-key": "test_sk_o2l0640draj6g7ymsx27",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
          };

          const authResponse = await fetch(
            "https://api.withmono.com/account/auth",
            authOptions
          );
          const authData = await authResponse.json();
          console.log("authdata id is", authData.id);

          const accountOptions = {
            method: "GET",
            headers: {
              accept: "application/json",
              "mono-sec-key": "test_sk_o2l0640draj6g7ymsx27",
            },
          };

          const accountResponse = await fetch(
            `https://api.withmono.com/accounts/${authData.id}`,
            accountOptions
          );
          const accountData: any = await accountResponse.json();
          const accountDataObj = {
            account_name: accountData.account.name,
            customer_id: accountData.account._id,
            account_number: accountData.account.accountNumber,
            account_id: code,
            bank_id: selectedBank.id,
          };

          linkBanks({
            variables: {
              input: {
                bankAccounts: [
                  {
                    accountName: accountData.account.name,
                    customerId: accountData.account._id,
                    accountNumber: accountData.account.accountNumber,
                    accountId: code,
                    bankId: selectedBank.id,
                    provider: selectedBank.integrator?.toUpperCase(),
                  },
                ],
              },
            },
          });

          // setAccountData((prev:any )=> { return { ...prev, ...accountDataObj } })
          // console.log("Account details:", accountData);
          // if (accountData) {
          //   localStorage.setItem("accountDataStatus", "true");
          //   saveToLocalStorage("accounts", accountDataObj);
          // }
          // return accountData;
          // setLinkBank(false);
          // setLinkBankSuccess(true);
        } catch (error: any) {
          console.error("Error retrieving account details:", error?.message);
          // throw error;
          toast.error(error?.message);
        }
      },
      key: "test_pk_g280h7rx6ddmkkvu9nnu",
    });

    monoInstance.setup();

    return monoInstance;
  }, [selectedBank]);

  // const [addBank, { loading, data }] = useMutation(ADD_BANK);

  // useEffect(() => {
  //   console.log(data);
  //   if (data?.accountLinkingIntegratorSelection?.code) {
  //   } else if (data?.accountLinkingIntegratorSelection?.data) {
  //     setLinkBank(false);
  //     setLinkBankSuccess(true);
  //   }
  // }, [data]);

  const linkBankHandler = () => {
    if (!selectedBank) return;

    console.log(selectedBank);

    if (selectedBank.integrator === "mono") {
      // openMonoWidget();
      monoConnect.open();
    } else if (selectedBank.integrator === "okra") {
      Okra.buildWithOptions({
        name: "Money-Hq",
        env: "sandbox",
        app_id: "",
        key: "13024bba-f1bd-54dc-9e48-f7449b551abe",
        token: "64119562307ba0155002b090",
        products: ["auth", "identity", "balance", "transactions", "income"], //in lowercase
        onSuccess: function (data: any) {
          console.log("options success", data);
          const accountDataObj = {
            accountName: data?.accounts[0]?.name,
            customerId: data.accounts[0]?.customer,
            accountNumber: data.accounts[0]?.nuban,
            accountId: data.accounts[0]?.id,
            bankId: data.bank_id,
            provider: selectedBank?.integrator?.toUpperCase(),
          };

          console.log(accountDataObj);

          linkBanks({
            variables: {
              input: {
                bankAccounts: [
                  {
                    accountName: data?.accounts[0]?.name,
                    customerId: data.accounts[0]?.customer,
                    accountNumber: data.accounts[0]?.nuban,
                    accountId: data.accounts[0]?.id,
                    bankId: selectedBank.id,
                    provider: selectedBank.integrator?.toUpperCase(),
                  },
                ],
              },
            },
          });
        },
        onClose: function () {
          console.log("options close");
        },
      });
    }

    // addBank({
    //   variables: {
    //     input: { account_type: "corporate", bank: selectedBank },
    //   },
    // });
    // setLinkBank(false);
    // setLinkBankSuccess(true);
  };

  return (
    <Portal onClose={onClose}>
      {linkBank && (
        <div className="w-[547px] h-[560px] bg-white rounded-[16px]">
          <div className="px-6 py-4 border-b-[1px] border-[#0000001F] font-semibold	text-[20px] leading-[28px]">
            Link your banks to this account
          </div>
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="px-6 py-4">
                <SearchBoxDropdown
                  selectedBank={selectedBank}
                  setSelectedBank={setSelectedBank}
                />
              </div>
              <div className="px-6"></div>
            </div>
            <div className="rounded-b-[16px] bg-[#F2F3F7] flex justify-end gap-x-2 mt-5 px-6 py-4 pb-8">
              <Button className="w-[95px] bg-white text-[#071A7E] border-[2px] border-[#EAEDEF]">
                Cancel
              </Button>
              <Button
                // disabled={loading}
                className="w-[156px]"
                onClick={linkBankHandler}
              >
                Link account
              </Button>
            </div>
          </div>
        </div>
      )}
      {linkBankSuccess && (
        <div className="bg-white h-[388px] w-[517px] rounded-[16px]">
          <div className="flex flex-col pt-[80px] items-center h-full">
            <Image src="/verify-icon.svg" alt="Logo" width={72} height={72} />
            <div className="mt-[32px] text-[#060809] font-medium text-[20px] leading-[28px]">
              Bank Connected
            </div>
            <div className="max-w-[278px] mb-4 text-center text-[#555555] font-normal text-[16px] leading-[24px]">
              Your transaction records has been successfully spooled.
            </div>
            <div className="flex gap-x-2">
              <Button
                onClick={() => {
                  setLinkBank(true);
                  setLinkBankSuccess(false);
                }}
                className="w-[175px]"
              >
                Add another account
              </Button>
              <Button
                className="w-[177px]  bg-white text-[#071A7E] border-[2px] border-[#EAEDEF]"
                onClick={() => {
                  setLinkBankSuccess(false);
                  onClose();
                  successHandler();
                }}
              >
                Go to dashboard
                {/* Message Bookkeeper */}
              </Button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </Portal>
  );
};

export default LinkBanks;
