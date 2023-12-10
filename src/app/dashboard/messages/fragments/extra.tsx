import { S3 } from "aws-sdk";
import { toast } from "react-toastify";

export const uploadFile = async (selectedFile: any) => {
  if (!selectedFile) return;

  try {
    const s3 = new S3({
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
      region: process.env.NEXT_PUBLIC_AWS_S3_REGION_NAME,
    });

    const initialFileName = selectedFile.name.replace(/\s/g, "");
    const fileNameParts = initialFileName.split(".");
    const fileName = fileNameParts[0]; // File name without extension
    const fileExtension = fileNameParts[1]; // File extension

    // Generate a random string
    const randomString = String(Date.now()); // Replace with your random string generation logic

    // Create the new file name with the random string appended
    const newFileName = `${fileName}${randomString}.${fileExtension}`;

    // Define the S3 bucket name and key for the uploaded file
    const bucketName = "monehqapi-publics";
    const key = `upload/${newFileName}`;

    // Prepare the parameters for the upload
    const params: S3.Types.PutObjectRequest = {
      Bucket: bucketName,
      Key: key,
      Body: selectedFile,
      ACL: "public-read", // Set the ACL to make the uploaded file publicly accessible
    };

    // Upload the file to AWS S3
    await s3.upload(params).promise();

    // Generate the file link using the bucket name and key
    const fileLink = `https://${bucketName}.s3.amazonaws.com/${key}`;

      return { name: fileName, ext: fileExtension, link: fileLink };
  } catch (error: any) {
      console.log(error);
      toast.error(error.message||"Unable to send this file");
  }
};
