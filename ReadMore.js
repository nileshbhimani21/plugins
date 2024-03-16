import { Button } from "@mui/material";
import { useState } from "react";

export default function ReadMore({ description }) {
  const [readMore, setReadMore] = useState(false);
  const readMoreHandler = () => {
    setReadMore(!readMore);
  };
  return (
    <span>
      {" "}
      {readMore ? description : description.length > 200 ? `${description.substring(0, 200)}...` : description}
      {description.length > 200 && (
        <Button variant="link" onClick={() => readMoreHandler()}>
          {readMore ? "read less" : "read more"}
        </Button>
      )}
    </span>
  );
}
