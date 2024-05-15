import React, { useContext, useState } from "react";
import InputSuggestion from "./InputSuggestion";
import UserContext from "../context/UserContext";
import {
  useAddFreezedEvent,
  useAddSuggestion,
  useDeleteCurrentEvent,
} from "../constants/query/PostQuery";
import AdminOperation from "./Admin/AdminOperation";
import EventDetails from "./EventDetails/EventDetails";
import Suggestion from "./Suggestion";
import { Button, Modal } from "antd";
import CollectionCreateForm from "./Modal/CollectionCreateForm";
import { PostEventToSlack } from "../constants/Slack";
const SuggestionCard = ({ event }) => {
  const { currentUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [inputModal, setInputModal] = useState(false);
  const [formInstance, setFormInstance] = useState();
  const { mutate: deleteCurrentEvent } = useDeleteCurrentEvent();
  const { mutate: moveCurrentEvent } = useAddFreezedEvent();
  const { mutate: updateVotes } = useAddSuggestion();
  const userId = currentUser.id ? currentUser.id : currentUser.uid
  const handleFreeze = () => {
    setOpen(!open);
  };
  const handleOk = async () => {
    try {
      const values = await formInstance?.validateFields();
      formInstance?.resetFields();
      const suggestion = values.suggestion;
      const finalizedSuggestion = { ...suggestion, upvotes: [], downvotes: [] };
      const updatedEvent = {
        ...event,
        finalizedSuggestion: finalizedSuggestion,
      };
      moveCurrentEvent(updatedEvent);
      deleteCurrentEvent(event);
      const message = `We have finalized "${values.suggestion.place}", for the event "${event.name}" based on voting count and feasibility`;
      const notifyInSlack = await PostEventToSlack(
        process.env.REACT_APP_SLACK_API,
        { message: message }
      );
      console.log(notifyInSlack);
    } catch (e) {
      console.log('Error',e);
    }
  };
  const handleUpVote = (suggestion, sid, inUpVotes, inDownVotes) => {
    if (inUpVotes) return;
    const downvotes = suggestion.downvotes;
    if (inDownVotes) {
      const index = downvotes.findIndex((userid) => userid === userId);
      downvotes.splice(index, 1);
    }
    const updatedSuggestion = {
      ...suggestion,
      upvotes: [...suggestion.upvotes, userId],
      downvotes,
    };
    const suggestions = [
      ...event.suggestions.slice(0, sid),
      updatedSuggestion,
      ...event.suggestions.slice(sid + 1),
    ];
    const updatedEvent = { ...event, suggestions };
    updateVotes(updatedEvent);
  };
  const handleDownVote = (suggestion, sid, inUpVotes, inDownVotes) => {
    if (inDownVotes) return;
    const upvotes = suggestion.upvotes;
    if (inUpVotes) {
      const index = upvotes.findIndex((userid) => userid === userId);
      upvotes.splice(index, 1);
    }
    const updatedSuggestion = {
      ...suggestion,
      upvotes,
      downvotes: [...suggestion.downvotes, userId],
    };
    const suggestions = [
      ...event.suggestions.slice(0, sid),
      updatedSuggestion,
      ...event.suggestions.slice(sid + 1),
    ];
    const updatedEvent = { ...event, suggestions };
    updateVotes(updatedEvent);
  };
  return (
    <div
      style={{
        width: "100%",
        padding: "1rem",
        backgroundColor: "aliceblue",
        borderRadius: "6px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      <EventDetails name={event.name} date={event.date} />
      <div style={{ fontSize: "1.5rem", fontWeight: "bolder" }}>
        suggestions:
      </div>
      <div>
        {event?.suggestions?.map((suggestion, index) => {
          const inUpVotes = suggestion.upvotes.indexOf(userId) !== -1;
          const inDownVotes =
            suggestion.downvotes.indexOf(userId) !== -1;
          return (
            <Suggestion
              key={index}
              suggestion={suggestion}
              index={index}
              handleUpVote={handleUpVote}
              handleDownVote={handleDownVote}
              inUpVotes={inUpVotes}
              inDownVotes={inDownVotes}
            />
          );
        })}
        <Button type="primary" onClick={() => setInputModal(!inputModal)}>
          Add suggestion
        </Button>
      </div>
      <Modal
        open={inputModal}
        title="Add suggestion"
        cancelText="close"
        centered
        onCancel={() => setInputModal(false)}
        footer={[
          <Button key="back" onClick={() => setInputModal(false)}>
            Close
          </Button>,
        ]}
      >
        <InputSuggestion key={event.id} event={event} />
      </Modal>
      <AdminOperation onClick={handleFreeze}>Freeze Event</AdminOperation>
      <Modal
        open={open}
        title="Finalize the destination"
        okText="Freeze suggestion"
        cancelText="Cancel"
        centered
        onCancel={() => setOpen(false)}
        onOk={handleOk}
      >
        <CollectionCreateForm
          onFormInstanceReady={(instance) => {
            setFormInstance(instance);
          }}
          data={[...event.suggestions]}
          name={"freezeform"}
        />
      </Modal>
    </div>
  );
};

export default SuggestionCard;
