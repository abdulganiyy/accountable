import React, { FC, useState, useEffect } from "react";
import { Portal } from "./Portal";
import { CloudArrowUp, X } from "@phosphor-icons/react";
import Button from "./buttons/Button";
import Success from "./layouts/Success";
import Image from "next/image";
import DragAndDropUpload from "./inputs/DragAndDropUpload";
import { CREATE_TRIAL_BALANCE, UPLOAD_STATEMENTS } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import { toast, ToastContainer } from "react-toastify";

interface UploadBankStatementProps {
  onClose: () => void;
  successHandler: () => void;
}

interface StatementUploadProps {
  successHandler: () => void;
}

interface SingleStatementProps {
  name?: string;
}

const SingleStatement: FC<SingleStatementProps> = ({ name }) => {
  return (
    <div className="py-4 px-3 flex border-[1px] rounded-[16px] border-[#E6E6E6E5] gap-x-2 relative">
      <span className="cursor-pointer absolute w-[16px] h-[16px] top-[18px] right-[14px] border-[1px] rounded-full border-[#000000] flex justify-center items-center">
        <X size={8} />
      </span>
      <span className="w-[40px] h-[40px] bg-[#FEE4E2] rounded-full flex justify-center items-center">
        <Image src="filepdf.svg" alt="pdf" height={23} width={20} />
      </span>
      <div>
        <p>{name || `Bank statement - July 2022`}</p>
        <p className="text-[12px] leading-[14px]">
          PDF <span className="text-[#9E9FA0]">•</span> 102 KB
        </p>
      </div>
    </div>
  );
};

const StatementUpload: FC<StatementUploadProps> = ({ successHandler }) => {
  const [statements, setStatements] = useState<any>([]);
  const [uploadStatements, result] = useMutation(UPLOAD_STATEMENTS);

  useEffect(() => {
    console.log(result?.data?.uploadBankStatement);
    if (result?.data?.uploadBankStatement?.data) {
      successHandler();
    } else if (result?.data?.uploadBankStatement?.code) {
      console.log(result?.data?.uploadBankStatement?.code);
      toast.error(result?.data?.uploadBankStatement?.message);
    }
  }, [result?.data?.uploadBankStatement, successHandler]);

  const uploadStatementsOfBank = () => {
    if (statements?.length) {
      console.log(statements);
      uploadStatements({
        variables: {
          input: {
            files: statements,
          },
        },
      });
    }

    // successHandler();
  };

  // const [createTrialBalance, result] = useMutation(CREATE_TRIAL_BALANCE);

  // useEffect(() => {
  //   console.luploadBankStatement;
  //   if (result?.data?.createTrialBalance?.data) {
  //     successHandler();
  //   } else if (result?.data?.createTrialBalance?.code) {
  //     console.log(result?.data?.createTrialBalance?.code);
  //     toast.error(result?.data?.createTrialBalance?.message);
  //   }
  // }, [result?.data?.createTrialBalance, successHandler]);

  // const createTrialBalanceHandler = () => {
  //   const accounts: any = localStorage.getItem("accounts");
  //   const parsedAccounts = JSON.parse(accounts);
  //   if (statements?.length && accounts?.length) {
  //     console.log(statements, accounts);
  //     createTrialBalance({
  //       variables: {
  //         input: {
  //           currency: "NGN",
  //           linked_accounts: parsedAccounts,
  //           statements,
  //         },
  //       },
  //     });
  //   }

  //   // successHandler();
  // };
  return (
    <div className="w-[418px] min-h-[478px] bg-white rounded-[16px] flex flex-col">
      <div className="px-6 py-4 border-b-[1px] border-[#0000001F] font-semibold	text-[20px] leading-[28px]">
        Upload bank statement
      </div>
      <div className="flex flex-col h-full grow justify-between">
        <div>
          <div className="px-6 py-4">
            <DragAndDropUpload setStatements={setStatements} />
          </div>
          <div className="px-6">
            {statements.length !== 0 &&
              statements.map((statement: any, i: number) => {
                return <SingleStatement key={i} />;
              })}
            {/* <SingleStatement /> */}
          </div>
        </div>
      </div>
      <div className="rounded-b-[16px] bg-[#F2F3F7] flex justify-end gap-x-2 mt-5 px-6 py-4 pb-8">
        <Button className="w-[95px] bg-white text-[#071A7E] border-[2px] border-[#EAEDEF]">
          Cancel
        </Button>
        <Button
          isLoading={result?.loading}
          className="w-[156px]"
          onClick={uploadStatementsOfBank}
        >
          Add statements
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
};

const UploadBankStatement: FC<UploadBankStatementProps> = ({
  onClose,
  successHandler,
}) => {
  const [uploadStatement, setUploadStatement] = useState(true);
  const [uploadStatementSuccess, setUploadStatementSuccess] = useState(false);

  return (
    <Portal onClose={onClose}>
      {uploadStatement && (
        <StatementUpload
          successHandler={() => {
            setUploadStatement(false);
            setUploadStatementSuccess(true);
          }}
        />
      )}
      {uploadStatementSuccess && (
        <Success
          clickHandler={() => {
            setUploadStatementSuccess(false);
            successHandler();
            // onClose();
          }}
          headerText="Bank Statement(s) 
          Added Successfully"
          bodyText="Your transaction records has been successfully spooled from the upload"
          footerText="Continue to next step"
        />
      )}
    </Portal>
  );
};

export default UploadBankStatement;
