import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useGetRoomById from "../../hooks/chat/useGetRoomById";
import useGetRooms from "../../hooks/chat/useGetRooms";
import axiosInstance from "../../utils/axiosInstance";
import DataLoader from "../../ui/DataLoader";


export default function ChatRoom() {
  const queryClient = useQueryClient();
  const chatContainerRef = useRef(null);

  const { data, isLoading } = useGetRoomById();
  const { data: rooms } = useGetRooms();

  const [messageToSent, setMessageToSent] = useState("");

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [data?.messages]);

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (message) => {
      const response = await axiosInstance.post("/admin/chat/send", message);
      return response.data;
    },

    onSuccess: () => {
      setMessageToSent("");
      queryClient.invalidateQueries({ queryKey: ["room"] });
    },

    onError: (error) => {
      console.error("Failed to send message:", error);
    },
  });

  return data?.room_id ? (
    <div className="chat_room">
      <div className="chat_header">
        <div className="user">
          <div className="img">
            <img
              src={
                rooms?.find?.((room) => room.room_id === data?.room_id)?.user
                  ?.image || "/images/icons/user_default.png"
              }
              alt="avatar"
              loading="lazy"
              onError={(e) => (e.target.src = "/icons/user_default.png")}
            />
          </div>
          <div className="content">
            <h6>
              {
                rooms?.find?.((room) => room.room_id === data?.room_id)?.user
                  ?.name
              }
            </h6>
          </div>
        </div>
      </div>

      <div className="chat_container" ref={chatContainerRef}>
        {data?.messages?.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender_type === "admin" ? "sent" : "received"
            }`}
          >
            <div className="content">
              <p>{msg.message}</p>
            </div>
            <span className="time">{msg.timestamp}</span>
          </div>
        ))}
      </div>

      <form
        className="chat_form"
        onSubmit={(e) => {
          e.preventDefault();

          sendMessage({
            room_id: data?.room_id,
            receiver_id: rooms.find?.((room) => room.room_id === data?.room_id)
              ?.user?.id,
            message: messageToSent,
          });
        }}
      >
        <div className="input_field">
          <input
            type="text"
            className="text_input"
            placeholder="Type a message"
            value={messageToSent}
            onChange={(e) => setMessageToSent(e.target.value)}
          />
        </div>

        <button
          aria-label="Submit"
          type="submit"
          disabled={isPending}
          style={{ opacity: isPending ? 0.5 : 1 }}
        >
          {isPending ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            <i className="fa-solid fa-paper-plane-top"></i>
          )}
        </button>
      </form>
    </div>
  ) : (
    <div className="chat_place_holder">
      {isLoading ? <DataLoader /> : <h6>Select a chat to start messaging</h6>}
    </div>
  );
}
