import "./Chat.scss";
import db from "../backend/Firebase";
import firebase from "firebase/app";
import { useParams } from "react-router";
import { useStateValue } from "../context/StateProvider";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert ";
import SearchOutlined from "@mui/icons-material/Search ";
import MicIcon from "@mui/icons-material/Mic";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SendIcon from "@mui/icons-material/Send";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { Link } from "react-router-dom";

const Chat = ({ removeRoom }) => {
  let { roomId } = useParams();
  const [{ user }, dispatch] = useStateValue();
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [showdropdown, setDropdown] = useState(false);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      name: user.displayName,
      message: input,
    });
    setInput("");
  };
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          if (snapshot.data()) {
            setRoomName(snapshot.data().name);
          }
        });

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/micah/${seed}.svg`} />
        <div className="chat__header--info">
          <h1>{roomName}</h1>
          <p>
            {messages.length !== 0
              ? "Online"
              : `Last seen at ` +
                  new Date(
                    messages[messages.length - 1]?.timestamp?.toDate()
                  ).toUTCString() || "no chats yet"}
          </p>
        </div>
        <div className="chat__header--icons">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <ClickAwayListener onClickAway={() => setDropdown(false)}>
            <div className="dropdown">
              <IconButton
                onClick={() => {
                  setDropdown(!showdropdown);
                }}
              >
                <MoreVertIcon />
              </IconButton>
              <div
                className={
                  showdropdown ? "dropdown__list" : "dropdown__list hide"
                }
              >
                <ul>
                  <Link to="/">
                    <li
                      onClick={() => {
                        removeRoom(roomId);
                      }}
                    >
                      Delete Room
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </ClickAwayListener>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <div key={message.timestamp}>
            <p
              className={`chat__body--message ${
                message.name === user.displayName && "chat__reciever"
              }`}
            >
              <span className="chat__body__message--name">{message.name}</span>
              {message.message[0].toUpperCase() + message.message.substring(1)}
              <span className="chat__body__message--time">
                {new Date(message.timestamp?.toDate()).toLocaleTimeString()}{" "}
                {new Date(message.timestamp?.toDate()).toLocaleDateString()}
              </span>
            </p>
          </div>
        ))}
      </div>
      <div className="chat__footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage} type="submit">
            <SendIcon />
          </button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
