import React from "react";
import { Popover, Avatar, Badge, message } from "antd";
import { Icon, TextInput } from "@tremor/react";
import { MailIcon, TrashIcon } from "@heroicons/react/outline";
import { fetchUserType } from "@/db/queries/getUser";
import { SearchIcon, UserIcon } from "@heroicons/react/solid";
import { selectNavSider, useNavSiderStore } from "@/store/useNavSider";
import { HeaderForm } from "../Header/HeaderForm";
import { Notification } from "@prisma/client";
import { DeleteNotifaction } from "@/actions/DeleteNotifaction";
interface HeaderNavProps {
  user: fetchUserType;
  notifactionData: Notification[];
}
const userAvatarPopOverContent = (
  <>
    <div className="flex flex-col items-center gap-5 p-3 w-50 box-border">
      <div className="flex items-center gap-2  ">
        <Icon icon={UserIcon} variant="light" color="blue" size="md" />
        <h3 className="text-gray-500 text-lg font-semibold">Profil</h3>
      </div>
      <HeaderForm />
    </div>
  </>
);

const HeaderNav = ({ user, notifactionData }: HeaderNavProps) => {
  const navSiderResponsive = useNavSiderStore(selectNavSider);
  const deleteNotification = async (id: number) => {
    message.loading("Siliniyor...", 0.5);
    const resposne = await DeleteNotifaction(id);
    if (resposne.status === 200) {
      return message.success(resposne.message);
    }
    if (resposne.status === 404) {
      return message.error(resposne.message);
    }
    if (resposne.status === 500) {
      return message.error(resposne.message);
    }
  };

  const mailPopOverContent = (
    <div className="flex flex-col gap-2">
      {notifactionData.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-2 p-1 box-border hover:bg-gray-100 ease-in duration-300 cursor-pointer"
        >
          <Avatar size={40} className="cursor-pointer" src={item.photoUrl} />
          <div className="flex justify-between">
            <div className="flex flex-col p-2">
              <h3 className="text-red-300 text-lg font-semibold">
                {item.title}
              </h3>
              <p className="text-sm">{item.message}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Icon
              icon={TrashIcon}
              variant="light"
              color="red"
              size="sm"
              onClick={deleteNotification.bind(null, item.id)}
              className="cursor-pointer"
              tooltip="Sil"
            />
          </div>
        </div>
      ))}
    </div>
  );
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
        title="Sözleşmesi Biten Çalışanlar"
      >
        <Badge color="red" count={notifactionData.length}>
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
