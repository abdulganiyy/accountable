"use client";
import React, { FC, useState } from "react";
import { Portal } from "./Portal";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PlusCircle } from "@phosphor-icons/react";
import Button from "./buttons/Button";
import Image from "next/image";
import EmailInput from "./inputs/EmailInput";
import SelectRole from "./inputs/SelectRole";
import { DevTool } from "@hookform/devtools";

interface InviteTeamMembersProps {
  onClose: () => void;
}

const schema = yup.object({
  invitations: yup.array().of(
    yup.object().shape({
      email: yup.string().required("Value is mendatory"),
      role: yup.string().required("Value is mendatory"),
    })
  ),
});

const InviteTeamMembers: FC<InviteTeamMembersProps> = ({ onClose }) => {
  const [inviteTeamMembers, setInviteTeamMembers] = useState(true);
  const [inviteTeamMembersSuccess, setInviteTeamMembersSuccess] =
    useState(false);

  const {
    watch,
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      invitations: [{ email: "", role: "" }],
    },
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "invitations",
  });

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <Portal onClose={onClose}>
      {inviteTeamMembers && (
        <div className="w-[480px] min-h-[552px] bg-white rounded-[16px] overflow-auto">
          <div className="px-6 py-4 border-b-[1px] border-[#0000001F] font-semibold	text-[20px] leading-[28px]">
            Add Team member
            <p className="text-[14px] leading-[20px] text-[#4C5259] font-normal">
              Enter the email address of your team and choose the role they
              should have within your organization
            </p>
          </div>
          <form>
            <div className="px-6 py-4">
              <div className="flex flex-col gap-y-4">
                {fields.map((field, index) => (
                  <div className="flex gap-x-2" key={field.id}>
                    <div className="w-[285px]">
                      <EmailInput
                        label="Email Address"
                        placeholder="name@example.com "
                        name={`invitations.${index}.email` as const}
                        register={register}
                      />
                    </div>
                    <div className="flex-auto">
                      <SelectRole
                        label="Role"
                        name={`invitations.${index}.role` as const}
                        register={register}
                        setValue={setValue}
                      />
                    </div>
                    {/* {index > 0 && (
                      <button type="button" onClick={() => remove(index)}>
                        Remove
                      </button>
                    )} */}
                  </div>
                ))}
                <div
                  onClick={() => {
                    append({ email: "", role: "" });
                  }}
                  className="flex gap-x-2 cursor-pointer"
                >
                  <span className="bg-[#F2F3F7] w-[24px] h-[24px] rounded-[8px] text-black p-1 cursor-pointer">
                    <PlusCircle size={16} />
                  </span>
                  <span>Add another user</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 w-full rounded-b-[16px] bg-[#F2F3F7] flex justify-end gap-x-2 mt-5 px-6 py-4 pb-8">
              <Button className="w-[95px] bg-white text-[#071A7E] border-[2px] border-[#EAEDEF]">
                Cancel
              </Button>
              <Button
                className="w-[156px]"
                onClick={() => {
                  setInviteTeamMembers(false);
                  setInviteTeamMembersSuccess(true);
                }}
              >
                Invite
              </Button>
            </div>
          </form>
        </div>
      )}
      {inviteTeamMembersSuccess && (
        <div className="bg-white h-[388px] w-[517px] rounded-[16px]">
          <div className="flex flex-col pt-[80px] items-center h-full">
            <Image src="/verify-icon.svg" alt="Logo" width={72} height={72} />
            <div className="mt-[32px] text-[#060809] font-medium text-[20px] leading-[28px]">
              Team Invites sent
            </div>
            <div className="max-w-[278px] mb-4 text-center text-[#555555] font-normal text-[16px] leading-[24px]">
              You have successfully invited your team members. You can invite
              new members and manage roles in settings
            </div>
            <div className="flex gap-x-2">
              <Button type="button" className="w-[175px]">
                Go to Dashboard
              </Button>
              <Button
                type="button"
                className="w-[177px]  bg-white text-[#071A7E] border-[2px] border-[#EAEDEF]"
                onClick={() => {
                  setInviteTeamMembersSuccess(false);
                  onClose();
                }}
              >
                Invite new members
              </Button>
            </div>
          </div>
          <DevTool control={control} />
        </div>
      )}
    </Portal>
  );
};

export default InviteTeamMembers;

// <div className="px-6 py-4 h-full relative z-20">
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="flex flex-col gap-y-2">
// {fields.map((field, i) => {
//   return (
//     <div key={field.id} className="flex flex-col gap-y-2">
//       <div className="bg-red-300">
//         <div className="flex flex-col gap-y-2 font-normal text-sm">
//           <label htmlFor={""}>Email Address</label>
//           <input
//             type="email"
//             id={""}
//             className="relative z-50 px-3 py-3.5 border-[1px] outline-none border-[#EAEDEF] rounded-md"
//             placeholder=""
//             {...register(`invitations.${i}.email`)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// })}
//               </div>
//             </form>
//           </div>
