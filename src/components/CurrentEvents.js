import React from "react";
import CollectionCreateFormModal from "./modal/CollectionCreateFormModal";
import { CurrentEvents } from "../constants/query/FetchQuery";
import SuggestionCard from "./SuggestionCard";

const Current = () => {
  const { isLoading, data } = CurrentEvents();
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        gap: "12px",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <div>isLoading..</div>
      ) : (
        data?.data.map((item) => <SuggestionCard key={item.id} event={item} />)
      )}
      <CollectionCreateFormModal />
    </div>
  );
};

export default Current;
