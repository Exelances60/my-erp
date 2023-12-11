import { HomeIcon, UserGroupIcon, UsersIcon } from "@heroicons/react/outline";

export const navMenuIcon = (icon: string) => {
  switch (icon) {
    case "AreaChartOutlined":
      return <HomeIcon className="w-5 h-5" />;
    case "UsergroupAddOutlined":
      return <UserGroupIcon className="w-5 h-5" />;
    case "TeamOutlined":
      return <UsersIcon className="w-5 h-5" />;
    default:
      return <></>;
  }
};
