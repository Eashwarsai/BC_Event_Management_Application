import { Modal } from "antd";
import CollectionCreateForm from "./CollectionCreateForm";
import { useContext, useState } from "react";
import { useAddEvent } from "../../constants/query/PostQuery";
import UserContext from "../../context/UserContext";

const CollectionCreateFormModal = () => {
  const [formInstance, setFormInstance] = useState();
  const [open, setOpen] = useState(false);
  const [error,setError] = useState('');
  const {currentUser} = useContext(UserContext);
  const {mutate} = useAddEvent();
  const handleOk = async () => {
    try {
      const values = await formInstance?.validateFields();
      console.log(values)
      formInstance?.resetFields();
      setOpen(false)
      setError('')
      const data={
        name:values?.EventName,
        date:values?.DateAndTime['$d'],
        suggestions:[],
      }
      mutate(data);
    } catch (error) {
      console.log("Failed:", error);
      setError("failed, Retry!")
    }
  }
  return (
    <>
      {(currentUser?.is_admin) && <div
        onClick={() => setOpen(true)}
        style={{ width: "100%", textAlign: "center", border: "2px solid black" }}
      >
        <h1>+</h1>
      </div>}
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
          name={'eventForm'}
        />
        {error&&<div>{error}</div>}
      </Modal>
    </>
  );
};
export default CollectionCreateFormModal;
