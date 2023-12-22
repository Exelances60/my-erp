"use client";
import React, { useState } from "react";
import { Card, Text, Title } from "@tremor/react";
import { ArrowRightIcon } from "@heroicons/react/outline";
import Paragraph from "antd/es/typography/Paragraph";
import { renderIcon } from "@/hooks/renderIcon";
import { selectUser, useUserStore } from "@/store/userStore";
import {
  DashboardCardAction,
  DashboardCardTitleAction,
} from "@/actions/DashboardAction/DashboardCardAction";
import Link from "next/link";

interface DashboardCardProps {
  uniqueKey: string;
  title?: string;
  icon?: string;
  detailsText?: string;
  path: string;
}

const DashboardCard = ({
  title,
  detailsText,
  icon,
  uniqueKey,
  path,
}: DashboardCardProps) => {
  const user = useUserStore(selectUser);
  const [editableTextCard, setEditableTextCard] = useState(detailsText);
  const [editableTitleCard, setEditableTitleCard] = useState(title);

  const handleTitleChange = (value: string) => {
    setEditableTitleCard(value);
    DashboardCardTitleAction(value, uniqueKey);
  };

  const handleChangeText = (value: string) => {
    setEditableTextCard(value);
    DashboardCardAction(value, uniqueKey);
  };

  return (
    <Card>
      <div className="flex justify-between items-center">
        <Text>{renderIcon(icon)}</Text>
      </div>
      <Paragraph
        className="flex items-center gap-1"
        editable={
          user?.role === "admin"
            ? {
                onChange: handleTitleChange,
                tooltip: "Düzenle",
              }
            : false
        }
      >
        <Title className="mt-3">{editableTitleCard}</Title>
      </Paragraph>
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
      <Link href={path}>
        İlgili sayfaya gitmek için{<ArrowRightIcon className="w-5 h-5" />}
      </Link>
      <Text className="mt-2">Düzenleyen: {user?.name}</Text>
    </Card>
  );
};

export default DashboardCard;
