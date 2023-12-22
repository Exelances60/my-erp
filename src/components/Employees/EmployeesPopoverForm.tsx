import React from "react";
import ButtonForm from "../login/ButtonForm";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/tr_TR";
import "dayjs/locale/tr";
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
import { UploadOutlined } from "@ant-design/icons";
import FormatForImage from "@/hooks/FormatForImage";
import { Employee } from "@prisma/client";
import { UpdateEmployees } from "@/actions/EmployeesActions/UpdateEmployees";

const { Option } = Select;

interface IEmployeeActionPopoverProps {
  value: Employee;
}

const EmployeesPopoverForm = ({ value }: IEmployeeActionPopoverProps) => {
  const { formatForImage, photoUrl } = FormatForImage();
  const onFinishFunc = async (payload: any) => {
    const response = await UpdateEmployees(value.id, photoUrl, payload);
    if (response?.status === 200) {
      return message.success("Çalışan Güncellendi", 1);
    }
  };
  return (
    <>
      <Form
        layout="vertical"
        requiredMark
        initialValues={{
          name: value.name,
          email: value.email,
          phone: value.phone,
          Role: value.role,
          address: value.address,
          salary: value.salary,
        }}
        onFinish={onFinishFunc}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Lütfen isim giriniz" }]}
            >
              <Input placeholder="İsim giriniz" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
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
              rules={[
                {
                  required: true,
                  message: "Lütfen Telefon Numarası Giriniz",
                },
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
                defaultValue={dayjs(value.agreement).locale("tr")}
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
        <ButtonForm color="default">Güncelle</ButtonForm>
      </Form>
    </>
  );
};

export default EmployeesPopoverForm;
