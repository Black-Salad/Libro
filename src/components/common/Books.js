import React from "react";

const Books = (props) => {
  if (props.kind === "reading") {
    return "읽는 중";
  } else if (props.kind === "finished") {
    return "읽음";
  } else if (props.kind === "interested") {
    return "관심";
  } else {
    return null;
  }
};

export default Books;
