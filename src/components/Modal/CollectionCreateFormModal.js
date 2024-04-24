import { Modal } from "antd";
import CollectionCreateForm from "./CollectionCreateForm";
import { useContext, useState } from "react";
import { useAddEvent } from "../../constants/query/PostQuery";
import UserContext from "../../context/UserContext";
import { PostEventToSlack } from "../../constants/Slack";
import { formatMessage } from "../../utils/utils";

const CollectionCreateFormModal = () => {
  const [formInstance, setFormInstance] = useState();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const { currentUser } = useContext(UserContext);
  const { mutate } = useAddEvent();
  const handleOk = async () => {
    try {
      const values = await formInstance?.validateFields();
      console.log(values);
      formInstance?.resetFields();
      setOpen(false);

      const data = {
        name: values?.EventName,
        date: values?.DateAndTime["$d"],
        suggestions: [],
      };
      console.log(data);
      const message = `we are planning for an event "${
        data.name
      }" on "${formatMessage(
        data.date
      )}" please post your suggestions in the Events application`;
      mutate(data);
      const notifyInSlack = await PostEventToSlack(
        process.env.REACT_APP_SLACK_API,
        { message: message }
      );
      console.log(notifyInSlack);
      setError("");
    } catch (error) {
      console.log("Failed:", error);
      setError("failed, Retry!");
    }
  };
  return (
    <>
      {currentUser?.is_admin && (
        <div
          onClick={() => setOpen(true)}
          style={{
            width: "100%",
            textAlign: "center",
            border: "2px solid black",
          }}
        >
          <h1>+</h1>
        </div>
      )}
      <Modal
        open={open}
        title="Create a new collection"
        okText="Create"
        cancelText="Cancel"
        centered
        onCancel={() => setOpen(false)}
        onOk={handleOk}
      >
        <CollectionCreateForm
          onFormInstanceReady={(instance) => {
            setFormInstance(instance);
          }}
          name={"eventForm"}
        />
        {error && <div>{error}</div>}
      </Modal>
    </>
  );
};
export default CollectionCreateFormModal;
