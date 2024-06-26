import React from "react";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Button } from "antd";
const Suggestion = ({
  suggestion,
  index,
  inUpVotes,
  inDownVotes,
  handleUpVote,
  handleDownVote,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "1rem 0rem",
      }}
      key={index}
    >
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <span style={{ fontSize: "1.5rem", fontWeight: "bolder" }}>
          {suggestion.place}
        </span>{" "}
        <Button
          onClick={() =>
            handleUpVote(suggestion, index, inUpVotes, inDownVotes)
          }
          type="primary"
          style={{ backgroundColor: inUpVotes ? "" : "grey" }}
        >
          <CaretUpOutlined />
        </Button>{" "}
        <Button
          onClick={() =>
            handleDownVote(suggestion, index, inUpVotes, inDownVotes)
          }
          type="primary"
          style={{ backgroundColor: inDownVotes ? "" : "grey" }}
        >
          <CaretDownOutlined />
        </Button>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <span style={{ fontSize: "1.5rem", fontWeight: "bolder" }}>
          {suggestion?.upvotes?.length}
        </span>
        <span style={{ fontSize: "1.5rem", fontWeight: "bolder" }}>
          {suggestion?.downvotes?.length}
        </span>
      </div>
    </div>
  );
};

export default Suggestion;
