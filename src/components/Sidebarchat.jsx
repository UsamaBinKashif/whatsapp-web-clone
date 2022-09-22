import "./Sidebarchat.scss";
import db from "../backend/Firebase";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
const Sidebarchat = ({ addNewChat, id, name }) => {
  const [messages, setMessages] = useState("");
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => {
              return doc.data();
            })
          );
        });
    }
  }, [id]);

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarchat">
        <div className="sidebarchat--left">
          <Avatar src={`https://avatars.dicebear.com/api/micah/${seed}.svg`} />
        </div>
        <div className="sidebarchat--right">
          <h1>{name}</h1>
          <p>  {messages[0]?.message.substring(0, 15)}
            {messages[0]?.message.length > 15 && "..."}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebarchat addnew">
      <h1>No chats found, Add new</h1>
    </div>
  );
};

export default Sidebarchat;
