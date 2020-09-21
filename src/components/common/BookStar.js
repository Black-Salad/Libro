import React, { useEffect } from "react";
import { axios } from "axios";
import { Fab } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";

const BookStar = () => {
  useEffect(() => {
    const apiUrl = `http://localhost:8000/api/bookshelf/?user_id=${loginUserId}`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("notes Data", response);
        setNotes(response.data);
      })
      .catch((response) => {
        console.error(response);
      });
  }, []);
  return (
    <div>
      <Fab size="small" color="default" title="관심 책에 추가">
        <StarIcon />
      </Fab>
    </div>
  );
};

export default BookStar;
