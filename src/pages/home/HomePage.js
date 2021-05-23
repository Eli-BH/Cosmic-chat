import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { userSelector } from "../../slices/user";
import { useHistory } from "react-router-dom";

import "./home.scss";
import axios from "axios";

const HomePage = () => {
  const [room, setRoom] = useState("Select a room");
  const [rooms, setRooms] = useState([]);
  const newRoom = useRef();
  const history = useHistory();

  const { userData } = useSelector(userSelector);

  useEffect(() => {
    const getRooms = async () => {
      try {
        const { data } = await axios.get(
          "https://cosmic-cord.herokuapp.com/api/room"
        );
        setRooms(data);
      } catch (error) {
        console.log(error);
      }
    };

    getRooms();
  }, []);

  const handleRoomAdd = async (e) => {
    e.preventDefault();

    if (newRoom.current.value.includes(" ")) {
      toast.error("No spaces", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      newRoom.current.value = "";
      return;
    }

    try {
      await axios.post("https://cosmic-cord.herokuapp.com/api/room/new_room", {
        username: userData.username,
        roomName: newRoom.current.value,
      });

      const { data } = await axios.get(
        "https://cosmic-cord.herokuapp.com/api/room"
      );
      setRooms(data);

      toast.success("Room Created", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      newRoom.current.value = "";
    } catch (error) {
      toast.error("Room already Exists", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleEnterRoom = async (e) => {
    e.preventDefault();

    if (room === "Select a room") {
      return toast.error("Select or Create a room", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    try {
      await axios.put("https://cosmic-cord.herokuapp.com/api/room/enter_room", {
        username: userData.username,
        roomName: room.toLowerCase(),
      });

      history.push(`/room/${room}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
      <div className=" home">
        <div className="container card home-card ">
          <div className="card-header heading">
            {" "}
            <h2>Enter a room</h2>
          </div>
          <div className="card-body home-card-body">
            <form className="room-form" onSubmit={handleEnterRoom}>
              <div className="input-group mb-3">
                <select
                  name="cars"
                  className="custom-select"
                  onChange={(e) => setRoom(e.target.value)}
                >
                  <option defaultValue>Select a room</option>

                  {rooms &&
                    rooms.map((room, index) => (
                      <option
                        key={index}
                        value={room.roomName}
                        style={{ textTransform: "capitalize" }}
                      >
                        {room.roomName}
                      </option>
                    ))}
                </select>
                <div className="input-group-append">
                  <button className="btn btn-primary" type="submit">
                    Enter Room
                  </button>
                </div>
              </div>
            </form>
            <form onSubmit={handleRoomAdd}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Create a new room"
                  ref={newRoom}
                />
                <div className="input-group-append">
                  <button className="btn btn-warning" type="submit">
                    Add Room
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
