import React from "react";
import { useFinishedEvents } from "../constants/query/FetchQuery";
import Charts from "./Charts/Charts";

const Analytics = () => {
  const { data, isLoading } = useFinishedEvents();
  
  if (isLoading) {
    return <>loading</>;
  }
  return (
    <Charts data={data.data}/>
  );
};

export default Analytics;
