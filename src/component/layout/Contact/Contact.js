import React from "react";
import "./contact.css";
import { Button } from  "@mui/material";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:mymailforabhi@gmail.com">
        <Button>Contact: mymailforavi@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;