import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Authentication/Firebase/FirebaseApp";

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState('')

  const onFinish = async (values) => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`);
      console.log(data)
      const id=data.data.length+1;
      const user = {
        user_id: id,
        username: values.username,
        password_hash: values.password,
        email: values.email,
        is_admin: false
      };
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users`,user);
      form.resetFields();
      setError('')
      setSuccessMessage('User Added Successfully');
    } catch (e) {
      setError('Error adding new user')
      console.log("Error", e);
    }
  };

  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
        {error&&<div>{error}</div>}
        {successMessage&&successMessage}
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
export default RegistrationForm;
