import { format } from "date-fns";
import axios from "axios";

format(new Date(2014, 1, 11), "MM/dd/yyyy");
//=> '02/11/2014'

export async function uploadToS3(file: File, signedRequest: string) {
  const options = {
    headers: {
      "Content-Type": file.type
    }
  };
  console.log("VIEW UPLOAD TO S3 OPTIONS", { file, options });

  await axios.put(signedRequest, file, options);
}

export function formatFilename(filename: string): string {
  // from: https://stackoverflow.com/questions/48495289/javascript-not-able-to-rename-file-before-upload
  const date = format(new Date(), "yyyyMMdd");
  const randomString = Math.random().toString(36).substring(2, 7);
  const fileExt = filename.split(".")[filename.split(".").length - 1];
  const cleanedFileameWithoutExt = filename
    .replace(`.${fileExt}`, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-");
  const newFileName = `${date}-${randomString}-${cleanedFileameWithoutExt}.${fileExt}`;
  return newFileName;
}
