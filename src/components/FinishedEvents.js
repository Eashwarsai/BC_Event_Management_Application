import React from "react";
import { useFinishedEvents } from "../constants/query/FetchQuery";
import EventDetails from "./EventDetails/EventDetails";

const Finished = () => {
  const { data, isLoading } = useFinishedEvents();

  if (isLoading) return <div>Loading</div>;
  return (
    <div>
      {data?.data?.map((item) => {
        return (
            <div style={{marginBottom: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            padding: "20px"}}>
              <EventDetails key={item.id} name={item.name} date={item.date} />
            </div>
        );
      })}
    </div>
  );
};

export default Finished;
