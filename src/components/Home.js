import React from "react";

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Events Page</h1>
    </div>
  );
};

export default Home;

const styles = {
  container: {
    display: "flex",
    minHeight:'100%',
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to bottom, #f0f0f0, #e9e9e9)",
    color: "#333",
    borderRadius:'0.5rem',
    padding: "1rem",
    textAlign: "center",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
  },
};
