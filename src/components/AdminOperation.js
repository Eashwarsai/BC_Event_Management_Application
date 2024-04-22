import { Button } from "antd";
import React, { useContext } from "react";
import UserContext from "../context/UserContext";

const AdminOperation = ({ children, onClick }) => {
  const { currentUser } = useContext(UserContext);
  return currentUser?.is_admin ? (
    <div style={{ display: "flex", justifyContent: "end", width: "100%" }}>
      <Button type="primary" onClick={onClick}>
        {children}
      </Button>
    </div>
  ) : (
    ""
  );
};

export default AdminOperation;
