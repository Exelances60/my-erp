import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { useState } from "react";

const FormatForImage = () => {
  const [photoUrl, setPhotoUrl] = useState("");
  const formatForImage = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === "done" && info.file.originFileObj) {
      const reader = new FileReader();
      reader.readAsDataURL(info.file.originFileObj);
      reader.onload = () => {
        setPhotoUrl(reader.result as string);
      };
    }
  };
  return { formatForImage, photoUrl };
};

export default FormatForImage;
