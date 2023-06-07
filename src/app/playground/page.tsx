"use client";
import React, { FC, useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { X, CalendarBlank, CaretDown, CaretUp } from "@phosphor-icons/react";
import Button from "@/components/buttons/Button";
import Image from "next/image";
import EmailInput from "@/components/inputs/EmailInput";
import { DevTool } from "@hookform/devtools";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import CustomDatePicker from "@/components/inputs/CustomDatePicker";
import AWS from "aws-sdk";

const UploadComponent = () => {
  const [files, setFiles] = useState<any>([]);
  const [progress, setProgress] = useState<any>({});
  const [filesLinks, setFilesLinks] = useState<any>([]);

  const handleFileChange = (event: any) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  useEffect(() => {
    // const handleUpload = () => {
    //   const s3 = new AWS.S3({
    //     accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    //     secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    //     region: process.env.NEXT_PUBLIC_AWS_S3_REGION_NAME,
    //   });

    //   files.forEach((file: any) => {
    //     const initialFileName = file.name.replace(/\s/g, "");
    //     const fileNameParts = initialFileName.split(".");
    //     const fileName = fileNameParts[0]; // File name without extension
    //     const fileExtension = fileNameParts[1]; // File extension

    //     // Generate a random string
    //     const randomString = String(Date.now()); // Replace with your random string generation logic

    //     // Create the new file name with the random string appended
    //     const newFileName = `${fileName}${randomString}.${fileExtension}`;

    //     // Define the S3 bucket name and key for the uploaded file
    //     const bucketName = "monehqapi-publics";
    //     const key = `upload/${newFileName}`;

    //     const params = {
    //       Bucket: "monehqapi-publics",
    //       Key: key,
    //       Body: file,
    //       ACL: "public-read",
    //     };

    //     const upload = s3.upload(params);
    //     upload.on("httpUploadProgress", (evt) => {
    //       const newProgress: any = { ...progress };
    //       newProgress[file.name] = (evt.loaded / evt.total) * 100;
    //       setProgress(newProgress);
    //     });

    //     upload
    //       .promise()
    //       .then(() => {
    //         // File upload completed
    //         const fileLink = `https://${bucketName}.s3.amazonaws.com/${key}`;
    //         console.log(fileLink);
    //         setFilesLinks([...filesLinks, fileLink]);
    //       })
    //       .catch((error) => {
    //         console.error("Error uploading file:", error);
    //       });
    //   });
    // };

    if (files.length !== 0 && files.length !== filesLinks.length) {
      // handleUpload();
    }
  }, [files, filesLinks, progress]);

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      {/* <button onClick={handleUpload}>Upload</button> */}
      {files.map((file: any) => (
        <div key={file.name}>
          <p>{file.name}</p>
          {progress[file.name] !== undefined && (
            <progress value={progress[file.name]} max="100" />
          )}
        </div>
      ))}
    </div>
  );
};

// export default UploadComponent;

const Page = () => {
  // .required("Value is mendatory"),
  // const schema = yup.object({
  //   date: yup.string().required(),
  // });

  // const { register, handleSubmit, control, setValue, formState } = useForm({
  //   resolver: yupResolver(schema),
  // });

  // const onSubmit = async (data: any) => {
  //   console.log(data);
  // };

  return (
    <div className="">
      <UploadComponent />
      {/* <div className="px-6 py-4 border-b-[1px] border-[#0000001F] font-semibold	text-[20px] leading-[28px]">
        Add Team member
        <p className="text-[14px] leading-[20px] text-[#4C5259] font-normal">
          Enter the email address of your team and choose the role they should
          have within your organization
        </p>
      </div> */}
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-6 py-4">
          <div className="flex flex-col gap-y-2">
          
            <CustomDatePicker
              name="date"
              register={register}
              setValue={setValue}
              placeholder="dd / mm / yy"
              label="From"
            />
          </div>
        </div>
        <div className="absolute bottom-0 w-full rounded-b-[16px] bg-[#F2F3F7] flex justify-end gap-x-2 mt-5 px-6 py-4 pb-8">
          <Button className="w-[156px]">Invite</Button>
        </div>
      </form> */}
      {/* <DevTool control={control} />  */}
    </div>
  );
};

export default Page;
