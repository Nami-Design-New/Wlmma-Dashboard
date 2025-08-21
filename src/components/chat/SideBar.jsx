import { useSearchParams } from "react-router";
import { useState } from "react";
import useGetRooms from "../../hooks/chat/useGetRooms";

export default function SideBar() {
  const { data: rooms } = useGetRooms();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRoom, setSelectedRoom] = useState(searchParams.get("room_id"));

  const handleSelectRoom = (room_id) => {
    setSelectedRoom(room_id);
    setSearchParams({ room_id });
  }

  return (
    <aside className="chat_sidebar">
      <div className="cards">
        {rooms?.map((chat) => (
          <div
            className={`chat_card ${selectedRoom === chat?.room_id ? "active" : ""}`}
            key={chat?.room_id}
            onClick={() => handleSelectRoom(chat?.room_id)}
          >
            <div className="img">
              <img
                src={chat?.user?.image || "/icons/user_default.png"}
                alt={chat?.user?.name}
                loading="lazy"
                onError={(e) =>
                  (e.target.src = "/icons/user_default.png")
                }
              />
            </div>
            <div className="content">
              <h6>{chat?.user?.name}</h6>
              <p>{chat?.latest_message?.message}</p>
              <span className="time">
                {chat?.latest_message?.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
