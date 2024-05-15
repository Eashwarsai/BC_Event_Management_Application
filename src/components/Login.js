import React, { useContext, useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { isValidLogin } from "../utils/utils";
import { auth } from "./Authentication/Firebase/FirebaseApp";

const Login = () => {
  const { setCurrentUser } = useContext(UserContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try{
      const provider = await new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);
        const response = await isValidLogin(auth.currentUser);
        if (!response) {
          await signOut(auth);
          console.log('not registered')
          setError('Not a registered user, kindly contact Admin')
        } else navigate("/Home");
      })
      .catch((error) => {
        console.log(error);
      });
    }catch(e){
      console.log('error',e)
    }
  };
  const onFinish = async ({ email, password }) => {
    try {
      const users = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users`
      );
      const user = users?.data.find((item) => item.email === email);
      if (user.password_hash === password) {
        setCurrentUser(user);
        setError("");
        navigate("/Home");
      } else {
        setError("invalidCredentials");
      }
    } catch (e) {
      console.log(e);
      setError("invalidCredentials");
      console.log(error);
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
      {error}
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
          label="Email"
          name="email"
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
      <h3>OR</h3>
      <Button onClick={handleGoogleLogin} type="primary">
        Login with google
      </Button>
    </div>
  );
};
export default Login;
