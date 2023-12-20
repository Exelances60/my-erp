"use client";
import { Space, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import Image from "next/image";
import React from "react";

interface DataType {
  key: string;
  name: string;
  address: string;
  tags: string[];
  email: string;
  phone: string;
  photoUrl: string;
  role: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text: string) => (
      <div className="flex items-center gap-2">
        <Image
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Picture of the author"
          width={30}
          height={30}
          quality={70}
        />
        <p>{text}</p>
      </div>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    responsive: ["md"],
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    responsive: ["md"],
  },
  {
    title: "Role",
    key: "role",
    dataIndex: "role",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    responsive: ["md"],
  },
  {
    title: "Action",
    key: "action",
    render: (text: string, record: { name: React.ReactNode }) => (
      <Space size="middle">
        <Tag color="error" className="cursor-pointer">
          Action
        </Tag>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    email: "asdasda@gmail.com",
    phone: "123123123",
    role: "Admin",
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
    photoUrl:
      "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
  },
  {
    key: "2",
    name: "Jim Green",
    email: "asdasd@gmail.com",
    phone: "123123123",
    role: "Admin",
    address: "London No. 1 Lake Park",
    tags: ["loser"],
    photoUrl:
      "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
  },
];

const EmployeesContainer = () => {
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default EmployeesContainer;
