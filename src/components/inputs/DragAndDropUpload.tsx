import React, { FC, useState, useEffect } from "react";
import { CloudArrowUp, X } from "@phosphor-icons/react";
import { uploadToAWSAndGetLinks } from "@/utils";
interface DragAndDropUploadProps {
  statements?: any;
  setStatements?: any;
}

const DragAndDropUpload: FC<DragAndDropUploadProps> = ({ setStatements }) => {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<any>([]);

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const droppedFiles = e.dataTransfer.files;
    // console.log(droppedFiles);
    setFiles(droppedFiles);
  };

  const handleInputChange = (e: any) => {
    const selectedFiles = e.target.files;
    // console.log(selectedFiles);
    setFiles(selectedFiles);
  };

  useEffect(() => {
    console.log(files);

    const getFilesLinks = async () => {
      if (!files.length) return;

      try {
        const links = await uploadToAWSAndGetLinks(files);
        console.log(links);
        setStatements(links);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    getFilesLinks();
  }, [files, setStatements]);

  return (
    <div
      className={`flex flex-col gap-y-2 justify-center items-center gap-x-2 p-3 h-[166px] rounded-sm border-[1px] border-dashed border-[#B3B5CE]`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <CloudArrowUp size={32} color="#707070" />
      <p className="text-[#04050F] font-medium text-[14px] leading-[20px]">
        <label htmlFor="upload" className="text-[#00085A] cursor-pointer">
          Click to upload
        </label>{" "}
        <input
          id="upload"
          className="hidden"
          type="file"
          accept=".xlsx"
          multiple
          onChange={handleInputChange}
        />
        or drag your file here
      </p>
      <p className="text-[#00085A] text-[12px] leading-[18px]">
        <a
          href="/MoneyHQ-BankStatement1687553920409.xlsx"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download sample (102kb)
        </a>
      </p>
      {/* {file ? (
        <div>
          <p>File Selected:</p>
          <p>{file.name}</p>
        </div>
      ) : (
        <div>
          <p>Drag and drop a file here</p>
          <input type="file" accept=".pdf" onChange={handleInputChange} />
        </div>
      )} */}
    </div>
  );
};

export default DragAndDropUpload;
