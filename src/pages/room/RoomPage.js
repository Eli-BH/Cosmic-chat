import { useParams, useHistory } from "react-router-dom";
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
  const [file, setFile] = useState(null);
  const [roomData, setRoomData] = useState({});

  const currentRoom = useParams().roomName.trim();

  const { userData } = useSelector(userSelector);

  const CONNECTION_PORT = "localhost:3001";
  const socket = useRef();
  const message = useRef();
  const scrollRef = useRef();
  const history = useHistory();

  useEffect(() => {
    const getRoomData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/api/room/current_room/${currentRoom}`
        );
        setRoomData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getRoomData();
  }, [currentRoom]);

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

    let formData = new FormData();
    formData.append("image", file);
    formData.append("text", message.current.value || "");
    formData.append("author", userData.username);
    formData.append("roomName", currentRoom);

    message.current.value = "";

    try {
      if (file) {
        const { data } = await axios.post(
          "http://localhost:3001/api/room/new_img_message",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setMessageList([
          ...messageList,
          {
            text: newMessage.content.text,
            author: userData.username,
            time: Date.now(),
            img: data,
          },
        ]);

        const newImgMessage = {
          room: currentRoom,

          content: {
            text: newMessage.content.text,
            time: Date.now(),
            author: userData.username,
            img: data,
          },
        };

        await socket.current.emit("sendMessage", newImgMessage);
      } else {
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
      }
    } catch (error) {
      console.log(error);
    }

    message.current.value = "";
    setFile(null);
  };

  console.log(file);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3001/api/room/${currentRoom}/${userData.username}`
      );
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(messageList);

  return (
    <div className="room">
      <h1 className="room-heading">{`Welcome to the  ${currentRoom} room.`}</h1>

      {roomData.admin === userData.username && (
        <button
          className="btn btn-lg btn-outline-danger delete-btn"
          onClick={handleDelete}
        >
          Delete Room
        </button>
      )}

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
                    {val.img && <img src={val.img} alt="img" />}
                    <div className="card-body card-content">{val.text}</div>
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
              <div className="input-group-prepend" style={{ width: 110 }}>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
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
