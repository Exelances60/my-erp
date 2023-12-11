import React from "react";
import { Popover, Avatar, Badge } from "antd";
import { Icon, TextInput } from "@tremor/react";
import { MailIcon } from "@heroicons/react/outline";
import { fetchUserType } from "@/db/queries/getUser";
import { SearchIcon, UserIcon } from "@heroicons/react/solid";
import { selectNavSider, useNavSiderStore } from "@/store/useNavSider";
import { HeaderForm } from "../Header/HeaderForm";

interface HeaderNavProps {
  user: fetchUserType;
}

const mailPopOverContent = (
  <div className="flex flex-col gap-2">
    <p className="text-gray-500  font-semibold">Bildirimler</p>
    <p className="text-gray-500  font-semibold">Bildirimler</p>
    <p className="text-gray-500  font-semibold">Bildirimler</p>
    <p className="text-gray-500  font-semibold">Bildirimler</p>
  </div>
);

const userAvatarPopOverContent = (
  <>
    <div className="flex flex-col items-center gap-5 p-3 w-50 box-border">
      <div className="flex items-center gap-2 ">
        <Icon icon={UserIcon} variant="light" color="blue" size="md" />
        <h3 className="text-gray-500 text-lg font-semibold">Profil</h3>
      </div>
      <HeaderForm />
    </div>
  </>
);

const HeaderNav = ({ user }: HeaderNavProps) => {
  const navSiderResponsive = useNavSiderStore(selectNavSider);
  return (
    <div className="flex items-center h-full gap-2 justify-end px-5 ">
      {!navSiderResponsive ? (
        <div className="flex items-center gap-1">
          <Icon
            icon={SearchIcon}
            variant="light"
            color="blue"
            size="md"
            className="cursor-pointer"
            tooltip="Arama"
          />
          <TextInput placeholder="Ara" color="blue" />
        </div>
      ) : null}

      <Popover
        content={mailPopOverContent}
        placement="bottomRight"
        trigger="click"
        title="Mail bildirimleri"
      >
        <Badge count={5} color="red">
          <Icon
            icon={MailIcon}
            className="cursor-pointer"
            variant="light"
            color="gray"
            size="md"
            tooltip="Bildirimler"
          />
        </Badge>
      </Popover>
      <h3 className="text-gray-500 text-lg font-semibold">{user?.name}</h3>
      <Popover
        content={userAvatarPopOverContent}
        placement="bottomRight"
        trigger="click"
      >
        <Avatar
          size={45}
          className="cursor-pointer"
          src={
            user?.photoUrl || "https://i.pravatar.cc/150?u=a042581f4e29026024d"
          }
        />
      </Popover>
    </div>
  );
};

export default HeaderNav;
