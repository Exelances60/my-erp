"use client";
import React, { useState } from "react";
import { Card, Title } from "@tremor/react";
import {
  ShoppingBagIcon,
  UsersIcon,
  AcademicCapIcon,
  IdentificationIcon,
  CreditCardIcon,
} from "@heroicons/react/outline";
import Paragraph from "antd/es/typography/Paragraph";
import { selectUser, useUserStore } from "@/store/userStore";
import { DashboardCardAction } from "@/actions/DashboardCardAction";

interface DashboardCardProps {
  uniqueKey: string;
  title?: string;
  icon?: string;
  detailsText?: string;
}

const DashboardCard = ({
  title,
  detailsText,
  icon,
  uniqueKey,
}: DashboardCardProps) => {
  const user = useUserStore(selectUser);
  const [editableTextCard, setEditableTextCard] = useState(detailsText);
  const handleChangeText = (value: string) => {
    setEditableTextCard(value);
    DashboardCardAction(title, value, uniqueKey);
  };

  const renderIcon = () => {
    switch (icon) {
      case "ShoppingBagIcon":
        return <ShoppingBagIcon className="w-7 h-7" />;
      case "UsersIcon":
        return <UsersIcon className="w-7 h-7" />;
      case "IdentificationIcon":
        return <IdentificationIcon className="w-7 h-7" />;
      case "CreditCardIcon":
        return <CreditCardIcon className="w-7 h-7" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      {renderIcon()}
      <Title className="mt-3">{title}</Title>
      <Paragraph
        editable={
          user?.role === "admin"
            ? {
                onChange: handleChangeText,
                tooltip: "Düzenle",
              }
            : false
        }
      >
        {editableTextCard}
      </Paragraph>
    </Card>
  );
};

export default DashboardCard;
