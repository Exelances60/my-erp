import React from "react";
import { Button, Result } from "antd";
import { NotPermmisonAction } from "@/actions/NotPermmisonAction";

interface NotPermmisonPageProps {
  status?: "403" | "404" | "500" | "success" | "error" | "info" | "warning";
  title?: string;
  subTitle?: string;
}

const NotPermmisonPage = ({
  status,
  title,
  subTitle,
}: NotPermmisonPageProps) => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <form
        action={NotPermmisonAction}
        className="w-full h-full items-center justify-center flex flex-col"
      >
        <Result status={status} title={title} subTitle={subTitle} />
        <Button type="primary" htmlType="submit">
          Back Home
        </Button>
      </form>
    </div>
  );
};

export default NotPermmisonPage;
