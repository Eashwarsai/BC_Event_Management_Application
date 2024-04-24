import { Button, Form, Input, Select } from "antd";
import React from "react";
import { categories } from "../constants/Constants";
import { useAddSuggestion } from "../constants/query/PostQuery";

const InputSuggestion = ({ event }) => {
  const [form] = Form.useForm();
  const { mutate } = useAddSuggestion();
  const handleFinish = (values) => {
    form.resetFields();
    const updatedValues = { ...values, upvotes: [], downvotes: [] };
    console.log(event);
    const updatedEvent = {
      ...event,
      suggestions: [...event.suggestions, updatedValues],
    };
    mutate(updatedEvent);
  }
  return (
    <Form
      layout={"inline"}
      form={form}
      style={{
        display: "flex",
        gap: "4px 0",
      }}
      onFinish={handleFinish}
    >
      <Form.Item
        name="place"
        rules={[
          {
            required: true,
            message: "Please input your Suggested place!",
          },
        ]}
      >
        <Input placeholder="eg: cricket @game point gachibowli "/>
      </Form.Item>
      <Form.Item
        name="category"
        rules={[
          {
            required: true,
            message: "Please input your Category!",
          },
        ]}
      >
        <Select defaultValue={"Choose one"}>
          {categories.map((item, index) => (
            <Select.Option key={index} value={item.key}>
              {item.key}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default InputSuggestion;
