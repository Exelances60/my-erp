import React from "react";
import { Popover, Avatar, Badge } from "antd";
import { Icon, TextInput } from "@tremor/react";
import { MailIcon } from "@heroicons/react/outline";
import { fetchUserType } from "@/db/queries/getUser";
import { SearchIcon, UserIcon } from "@heroicons/react/solid";
import { selectNavSider, useNavSiderStore } from "@/store/useNavSider";
import { HeaderForm } from "../Header/HeaderForm";
import { Employee } from "@prisma/client";
interface HeaderNavProps {
  user: fetchUserType;
  overAgreement: Employee[];
}
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

const HeaderNav = ({ user, overAgreement }: HeaderNavProps) => {
  const navSiderResponsive = useNavSiderStore(selectNavSider);

  const mailPopOverContent = (
    <div className="flex flex-col gap-2">
      {overAgreement.map((employee) => {
        return (
          <div
            key={employee.id}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
          >
            <Avatar
              size={45}
              className="cursor-pointer"
              src={employee.photoUrl}
            />
            <div className="flex flex-col">
              <h3 className="text-gray-500 text-lg font-semibold">
                {employee.name}
              </h3>
              <p className="text-red-300">Sözleşmesi Bitmiş</p>
              <p className="text-gray-500 text-sm">{employee.email}</p>
            </div>
          </div>
        );
      })}
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
        <Badge count={overAgreement.length} color="red">
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
