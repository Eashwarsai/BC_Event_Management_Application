import React, { useContext, useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setCurrentUser } = useContext(UserContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onFinish = async ({ username, password }) => {
    try {
      const users = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`);
      const user = users?.data.find((item) => item.username === username);
      if (user && user.password_hash === password) {
        setCurrentUser(user);
        setError("");
        navigate("/Home");
      } else {
        setError("invalidCredentials");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "aliceblue",
      }}
    >
      <h1>Login</h1>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
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
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        {error && <div>{error}</div>}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
