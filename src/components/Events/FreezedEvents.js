import React, { useContext } from "react";
import { useFreezedEvents } from "../../constants/query/FetchQuery";
import EventDetails from "../EventDetails/EventDetails";
import AdminOperation from "../Admin/AdminOperation";
import {
  useAddFinishedEvent,
  useDeleteFreezedEvent,
  useUpdateFreezedEvent,
} from "../../constants/query/PostQuery";
import Suggestion from "../Suggestion";
import UserContext from "../../context/UserContext";

const Freezed = () => {
  const { currentUser } = useContext(UserContext);
  const { data, isLoading } = useFreezedEvents();
  const { mutate: deleteFreezedEvent } = useDeleteFreezedEvent();
  const { mutate: moveFinishedEvent } = useAddFinishedEvent();
  const { mutate: updateVotes } = useUpdateFreezedEvent();
  const moveToFinishedHandler = (event) => {
    deleteFreezedEvent(event);
    moveFinishedEvent(event);
  };
  const update = (index, updatedSuggestion) => {
    const event = data.data[index];
    const updatedEvent = { ...event, finalizedSuggestion: updatedSuggestion };
    updateVotes(updatedEvent);
  };
  const handleUpVote = (suggestion, index, inUpVotes, inDownVotes) => {
    if (inUpVotes) return;
    const downvotes = suggestion.downvotes;
    if (inDownVotes) {
      const index = downvotes.findIndex((userid) => userid === currentUser.id);
      downvotes.splice(index, 1);
    }
    const updatedSuggestion = {
      ...suggestion,
      upvotes: [...suggestion.upvotes, currentUser?.id],
      downvotes,
    };
    update(index, updatedSuggestion);
  };
  const handleDownVote = (suggestion, index, inUpVotes, inDownVotes) => {
    if (inDownVotes) return;
    const upvotes = suggestion.upvotes;
    if (inUpVotes) {
      const index = upvotes.findIndex((userid) => userid === currentUser.id);
      upvotes.splice(index, 1);
    }
    const updatedSuggestion = {
      ...suggestion,
      upvotes,
      downvotes: [...suggestion.downvotes, currentUser?.id],
    };
    update(index, updatedSuggestion);
  };
  if (isLoading) return <div>Loading</div>;
  return (
    <div>
      {data?.data?.length>0?data.data.map((item, index) => {
        const inUpVotes =
          item.finalizedSuggestion.upvotes.indexOf(currentUser?.id) !== -1;
        const inDownVotes =
          item.finalizedSuggestion.downvotes.indexOf(currentUser?.id) !== -1;
        return (
          <div
            key={item.id}
            style={{
              backgroundColor: "aliceblue",
              padding: "1rem",
              margin: "0.5rem",
              borderRadius: "0.5rem",
            }}
          >
            <EventDetails name={item.name} date={item.date} />
            <h1 style={{color:"blue"}}>Confirm your Availability :</h1>
            <Suggestion
              suggestion={item.finalizedSuggestion}
              index={index}
              inUpVotes={inUpVotes}
              inDownVotes={inDownVotes}
              handleUpVote={handleUpVote}
              handleDownVote={handleDownVote}
            />
            <AdminOperation onClick={() => moveToFinishedHandler(item)}>
              Mark as done
            </AdminOperation>
          </div>
        );
      }):<div>No current Freezed Events</div>}
    </div>
  );
};

export default Freezed;
