"use client";
import React from "react";
import { Form, Input, Select, DatePicker, Row, Col } from "antd";
import ButtonForm from "../login/ButtonForm";
import { useFormState } from "react-dom";
import { CreateEmployees } from "@/actions/CreateEmployees";
const { Option } = Select;

const EmployeesDrawer = () => {
  const [formState, action] = useFormState(CreateEmployees, {
    errors: {},
  });
  return (
    <div>
      <Form layout="vertical" requiredMark onFinish={action}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              validateStatus={formState?.errors?.name ? "error" : undefined}
              help={formState?.errors?.name}
              rules={[{ required: true, message: "Lütfen isim giriniz" }]}
            >
              <Input placeholder="İsim giriniz" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              validateStatus={formState?.errors?.email ? "error" : undefined}
              help={formState?.errors?.email}
              rules={[{ required: true, message: "Mail Giriniz" }]}
            >
              <Input placeholder="Mail Giriniz" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Phone"
              validateStatus={formState?.errors?.phone ? "error" : undefined}
              help={formState?.errors?.phone}
              rules={[
                { required: true, message: "Lütfen Telefon Numarası Giriniz" },
              ]}
            >
              <Input
                style={{ width: "100%" }}
                addonBefore="+90"
                placeholder="Telefon Numarası"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="Role"
              label="Role"
              validateStatus={formState?.errors?.Role ? "error" : undefined}
              help={formState?.errors?.Role}
              rules={[{ required: true, message: "Lütfen Rol Şeçin" }]}
            >
              <Select placeholder="Please select an owner">
                <Option value="owner">Owner</Option>
                <Option value="admin">Admin</Option>
                <Option value="user">User</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="address"
              label="Address"
              validateStatus={formState?.errors?.address ? "error" : undefined}
              help={formState?.errors?.address}
              rules={[{ required: true, message: "Adres Giriniz" }]}
            >
              <Input placeholder="Adres Giriniz" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="dateTime"
              label="DateTime"
              rules={[
                { required: true, message: "Please choose the dateTime" },
              ]}
            >
              <DatePicker.RangePicker
                style={{ width: "100%" }}
                getPopupContainer={(trigger) => trigger.parentElement!}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className="w-full items-center justify-center">
          <ButtonForm color="default">Kaydet</ButtonForm>
        </Row>
      </Form>
    </div>
  );
};

export default EmployeesDrawer;
