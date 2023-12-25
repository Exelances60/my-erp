"use client";
import { Employee } from "@prisma/client";
import { Table, Input, Space, Tag, Image, Popover, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { ColumnsType } from "antd/es/table";
import EmployeesActionPopover from "./EmployeesActionPopover";

interface IEmployeeContainerProps {
  employees: Employee[];
}

const EmployeesContainer = ({ employees }: IEmployeeContainerProps) => {
  const [filterName, setFilterName] = useState<string>("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<Employee[]>([]);

  const columns: ColumnsType<Employee> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      responsive: ["md"],
      width: 50,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 100,
      filterDropdown: () => (
        <div className="p-4">
          <Input.Search
            placeholder="Search name"
            onChange={(e) => setFilterName(e.target.value)}
            enterButton
          />
        </div>
      ),
      filteredValue: [filterName],
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        String(record.name)
          .toLowerCase()
          .includes(value as string),
      render: (text: string, { photoUrl }: Employee) => (
        <div className="flex items-center gap-2">
          <Image
            src={photoUrl || "/images/placeholder.png"}
            alt="Profile"
            className="rounded-md"
            width={40}
            height={40}
          />
          <p className="mx-2">{text}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
      render: (value) => (
        <div>
          <Tooltip placement="top" title={value}>
            <Tag color="cyan" className="w-40 overflow-hidden truncate">
              {value}
            </Tag>
          </Tooltip>
        </div>
      ),
      width: 100,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 100,
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      width: 100,
      filters: [
        { text: "Admin", value: "admin" },
        { text: "User", value: "user" },
      ],
      responsive: ["lg"],
      render: (value) => (
        <Tag color="processing" className="text-base">
          {value.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 200,
      responsive: ["md"],
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      render: (value) => (
        <div>
          <Tooltip placement="top" title={value}>
            <Tag color="success">{value} &#8378;</Tag>
          </Tooltip>
        </div>
      ),
      responsive: ["md"],
      width: 100,
    },
    {
      width: 30,
      title: "Action",
      key: "action",
      render: (text: string, value) => (
        <Space size="middle">
          <Popover
            content={<EmployeesActionPopover value={value} />}
            placement="topLeft"
            title="Haraketler"
          >
            <Tag color="error" className="cursor-pointer">
              Düzenle
            </Tag>
          </Popover>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        rowSelection={{
          type: "checkbox",
          onChange(selectedRowKeys, selectedRows, info) {
            setSelectedRowKeys(selectedRows);
          },
        }}
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={employees}
        pagination={{ defaultPageSize: 5 }}
      />
    </div>
  );
};

export default EmployeesContainer;
