"use client";
import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  InputNumber,
  Upload,
  Button,
  message,
} from "antd";
import ButtonForm from "../login/ButtonForm";
import { useFormState } from "react-dom";
import { UploadOutlined } from "@ant-design/icons";
import { CreateEmployees } from "@/actions/CreateEmployees";
import locale from "antd/es/date-picker/locale/tr_TR";
import "dayjs/locale/tr";
import { UploadChangeParam, UploadFile } from "antd/es/upload";

const { Option } = Select;

const EmployeesDrawer = () => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [formState, action] = useFormState(
    CreateEmployees.bind(null, photoUrl),
    {
      errors: {},
    }
  );

  const formatForImage = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === "done" && info.file.originFileObj) {
      const reader = new FileReader();
      reader.readAsDataURL(info.file.originFileObj);
      reader.onload = () => {
        setPhotoUrl(reader.result as string);
      };
    }
  };

  if (formState?.errors?.success) {
    message.success("Başarıyla oluşturuldu", 1);
    formState.errors.success = false;
  }

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
              label="Telefon Numarası"
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
              <Select placeholder="Lütfen Rol Şeçiniz">
                <Option value="owner">Owner</Option>
                <Option value="user">User</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="address"
              label="Adres"
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
              label="Sözleşme Bitiş Tarihi"
              rules={[{ required: true, message: "Lütfen Tarih Giriniz" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                locale={locale}
                placeholder="Lütfen Tarih Giriniz"
                format={"DD/MM/YYYY"}
                getPopupContainer={(trigger) => trigger.parentElement!}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} className="w-full items-center justify-center">
          <Col span={12}>
            <Form.Item
              name="salary"
              label="Maaş"
              validateStatus={formState?.errors?.salary ? "error" : undefined}
              help={formState?.errors?.salary}
              rules={[{ required: true, message: "Maaş Giriniz" }]}
            >
              <InputNumber
                addonBefore="+"
                addonAfter="TL"
                min={0}
                defaultValue={100}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture"
              onChange={formatForImage}
            >
              <Button icon={<UploadOutlined />}>
                Bilgisayardan Resim Yükle
              </Button>
            </Upload>
          </Col>
        </Row>
        <ButtonForm color="default">Kaydet</ButtonForm>
        <Button htmlType="reset" className="mt-5 ml-5">
          Reset
        </Button>
      </Form>
    </div>
  );
};

export default EmployeesDrawer;
