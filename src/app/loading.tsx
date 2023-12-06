import { CircularProgress } from "@nextui-org/react";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <CircularProgress size="lg" />
    </div>
  );
};

export default Loading;
