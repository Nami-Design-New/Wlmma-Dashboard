import ChatRoom from "../components/chat/ChatRoom";
import SideBar from "../components/chat/SideBar";
import useGetRooms from "../hooks/chat/useGetRooms";
import DataLoader from "./../ui/DataLoader";

export default function Support() {
  const { isLoading } = useGetRooms();
  return (
    <section className="chats_section">
      <div className="page_head">
        <h1>Support Message</h1>
        <p>View and manage support messages</p>
      </div>

      <div className="chat_wrapper">
        {isLoading ? (
          <DataLoader />
        ) : (
          <>
            <SideBar />
            <ChatRoom />
          </>
        )}
      </div>
    </section>
  );
}
