import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./room.scss";
import axios from "axios";

const RoomPage = () => {
  const [roomData, setRoomData] = useState(null);
  const currentRoom = useParams().roomName.trim();

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/api/room/current_room/${currentRoom}`
        );
        setRoomData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRoomData();
  }, [currentRoom]);

  return (
    <div className="room">
      <h1 className="room-heading">{`Welcome to the  ${currentRoom} room.`}</h1>
      <div className="room-wrapper container">
        <div className="current-user-list">
          <ul className="list-group">
            {roomData?.currentUsers.map((user, index) => (
              <li key={index} className="list-group-item">
                {user}
              </li>
            ))}
          </ul>
        </div>
        <div className="room-message-board">
          <div className="room-messages card"></div>
          <form onSubmit={console.log("sent")}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Type something"
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
