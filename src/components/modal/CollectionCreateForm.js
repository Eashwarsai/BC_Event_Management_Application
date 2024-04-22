import { useEffect } from "react";
import { DatePicker, Form, Input, Radio } from "antd";
import dayjs from 'dayjs';
const CollectionCreateForm = ({ onFormInstanceReady, data, name }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    onFormInstanceReady(form);
  }, []);
  if (data) {
    console.log(data);
    data.sort((item1, item2) => {
      const downvotes1 = item1?.downvotes.length;
      const upvotes1 = item1?.upvotes.length;
      const downvotes2 = item2?.downvotes.length;
      const upvotes2 = item2?.upvotes.length;
      if (upvotes1 === upvotes2) return downvotes1 - downvotes2;
      return upvotes2 - upvotes1;
    });
  }
  return (
    <Form layout="vertical" form={form} name={name}>
      {data ? (
        <Form.Item
          name="suggestion"
          label="Select a suggestion"
          rules={[
            {
              required: true,
              message: "Please pick an item!",
            },
          ]}
        >
          <Radio.Group
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {data.map((suggestion, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <Radio.Button
                  style={{ width: "100%", borderRadius: "0.5rem" }}
                  value={suggestion}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {suggestion.place}
                    <div>
                      <span style={{ marginRight: "0.5rem", color: "#48BB78" }}>
                        {suggestion.upvotes.length}
                      </span>
                      <span style={{ marginRight: "0.5rem", color: "#F56565" }}>
                        {suggestion.downvotes.length}
                      </span>
                    </div>
                  </div>
                </Radio.Button>
              </div>
            ))}
          </Radio.Group>
        </Form.Item>
      ) : (
        <>
          <Form.Item
            label="Name of Event"
            name="EventName"
            rules={[
              {
                required: true,
                message: "Enter a Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label=" Date and time"
            name="DateAndTime"
            rules={[
              {
                required: true,
                message: "Select date and time",
              },
            ]}
          >
            <DatePicker disabledDate={(current)=> current < dayjs().endOf('day')} showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
        </>
      )}
    </Form>
  );
};
export default CollectionCreateForm;
