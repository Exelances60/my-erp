import {
  AreaChartOutlined,
  UsergroupAddOutlined,
  TeamOutlined,
} from "@ant-design/icons";

export const navMenuIcon = (icon: string) => {
  switch (icon) {
    case "AreaChartOutlined":
      return <AreaChartOutlined className="text-xl" />;
    case "UsergroupAddOutlined":
      return <UsergroupAddOutlined className="text-xl" />;
    case "TeamOutlined":
      return <TeamOutlined className="text-xl" />;
    default:
      return <></>;
  }
};
