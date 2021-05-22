import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../slices/user";
import { format } from "timeago.js";

import "./room.scss";
import axios from "axios";
import io from "socket.io-client";

const RoomPage = () => {
  const [messageList, setMessageList] = useState([]);
  const [ioMessageList, setIoMessageList] = useState([]);
  const [file, setFile] = useState("");

  const currentRoom = useParams().roomName.trim();

  const { userData } = useSelector(userSelector);

  const CONNECTION_PORT = "localhost:3001";
  const socket = useRef();
  const message = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(() => {
    const currentUsers = {
      username: userData.username,
      roomName: currentRoom,
    };

    userData.username && socket.current.emit("joinRoom", currentUsers);
  }, [currentRoom, userData.username]);

  useEffect(() => {
    socket.current.on("receiveMessage", (data) => {
      setMessageList([...messageList, data]);
    });
  });

  useEffect(() => {
    socket.current.on("sendList", (data) => {
      setIoMessageList(data[currentRoom]);
    });
  });

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/api/room/messages/${currentRoom}`
        );
        setMessageList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [currentRoom]);

  const sendMessage = async (e) => {
    e.preventDefault();

    const newMessage = {
      room: currentRoom,

      content: {
        text: message.current.value,
        time: Date.now(),
        author: userData.username,
      },
    };

    message.current.value = "";

    try {
      setMessageList([
        ...messageList,
        {
          text: newMessage.content.text,
          author: userData.username,
          time: Date.now(),
        },
      ]);

      await socket.current.emit("sendMessage", newMessage);

      await axios.post("http://localhost:3001/api/room/new_message", {
        roomName: currentRoom,
        text: newMessage.content.text,
        author: userData.username,
      });
    } catch (error) {
      console.log(error);
    }

    message.current.value = "";
  };

  console.log("somehing");

  return (
    <div className="room">
      <h1 className="room-heading">{`Welcome to the  ${currentRoom} room.`}</h1>
      <div className="room-wrapper container">
        <div className="current-user-list">
          <ul className="list-group">
            {ioMessageList?.map((user, index) => (
              <li
                key={index}
                className="list-group-item"
                style={{ textTransform: "capitalize" }}
              >
                {user.username}
              </li>
            ))}
          </ul>
        </div>

        <div className="room-message-board">
          <div className="room-messages card">
            <div className="room-message-body card-body">
              {messageList.map((val, index) => (
                <div className="messageContainer" key={index} ref={scrollRef}>
                  <div
                    className={
                      val.author === userData.username ? "card ml-auto" : "card"
                    }
                  >
                    <div className="card-body card-content">
                      {file && <img src={file} alt="img" />}

                      {val.text}
                    </div>
                    <div className="card-footer">
                      <small>{val.author} - </small>
                      <small>{format(val.time)}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={sendMessage}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Type something"
                ref={message}
              />
              <div className="input-group-append">
                <button className="btn btn-warning" type="submit">
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
