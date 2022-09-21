import "./Sidebar.scss";
import db, { auth } from "../backend/Firebase";
import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MoreVertIcon from "@mui/icons-material/MoreVert ";
import SearchOutlined from "@mui/icons-material/Search ";
import Sidebarchat from "./Sidebarchat";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { actionTypes } from "../context/reducer";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [showdropdown, setDropdown] = useState(false);
  const [search, setSearch] = useState("");

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        });
        setDropdown(!showdropdown);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const createChat = () => {
    setDropdown(!showdropdown);
    const roomName = prompt("Please enter name for Room");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <img src={user.photoURL} referrerPolicy="no-referrer" />
        <div className="sidebar__header--icons">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <span onClick={createChat}>
            <IconButton>
              <ChatIcon />
            </IconButton>
          </span>
          <ClickAwayListener onClickAway={() => setDropdown(false)}>
            <span className="dropdown">
              <IconButton
                onClick={() => {
                  setDropdown(!showdropdown);
                }}
              >
                <MoreVertIcon />
              </IconButton>
              <span
                className={
                  showdropdown ? "dropdown__list" : "dropdown__list hide"
                }
              >
                <ul>
                  <li onClick={signOut}>Log Out</li>
                  <li onClick={() => alert("I love you")}>Help?</li>
                </ul>
              </span>
            </span>
          </ClickAwayListener>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__search--container">
          <SearchOutlined />
          <input
            type="text"
            placeholder="Search or start new chat"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
        </div>
      </div>
      <div className="sidebar__chats">
        {rooms.map((room) => {
          if (
            room.data.name.toLowerCase().includes(search.toLowerCase()) ||
            search === ""
          ) {
            return (
              <Sidebarchat key={room.id} id={room.id} name={room.data.name} />
            );
          }
          return <></>;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
