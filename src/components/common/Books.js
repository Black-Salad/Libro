import React from "react";

const Books = (props) => {
  if (props.kind === "reading") {
    return (
      <div style={{ padding: "20px" }}>
        <img src="/img/gill.jpg" />
      </div>
    );
  } else if (props.kind === "finished") {
    return (
      <div style={{ padding: "20px" }}>
        <img src="/img/reasonoftraveling.jpg" />
      </div>
    );
  } else if (props.kind === "interested") {
    return "관심";
  } else {
    return null;
  }
};

export default Books;
