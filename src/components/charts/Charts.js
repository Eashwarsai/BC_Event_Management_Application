import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

export default function Charts({ data }) {
  const upvotes = [];
  const downvotes = [];
  const names = [];
  const categories = {};
  const events = data;
  console.log(events);
  events.forEach((event) => {
    const category = event.finalizedSuggestion.category;
    names.push(event.name);
    upvotes.push(event.finalizedSuggestion.upvotes.length);
    downvotes.push(event.finalizedSuggestion.downvotes.length);
    if (categories[category]) categories[category]++;
    else categories[category] = 1;
  });
  console.log(names);
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
          height: "50%",
        }}
      >
        <h3>upvotes and downvotes based on availability</h3>
        <BarChart
          height={300}
          sx={{ flex: 1 }}
          series={[
            { data: upvotes, label: "upvotes", id: "uvId" },
            { data: downvotes, label: "downvotes", id: "dvId" },
          ]}
          xAxis={[{ data: names, scaleType: "band" }]}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          width: "100%",
          height: "50%",
        }}
      >
        <h3>Overall representation of categories of Events </h3>
        <PieChart
          style={{ flex: 1 }}
          series={[
            {
              data: Object.keys(categories).map((category, index) => {
                return {
                  id: index,
                  value: categories[category],
                  label: category,
                };
              }),
            },
          ]}
          // width={500}
          height={300}
        />
      </div>
    </div>
  );
}
