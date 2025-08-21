import { Outlet } from "react-router";
import { requestPermission, listenToMessages } from "../firebase/service";
import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import useGetRooms from "../hooks/chat/useGetRooms";
import useGetRoomById from "../hooks/chat/useGetRoomById";

export default function DashboardLayout() {
  const { refetch: refetchRoom } = useGetRoomById();
  const { refetch: refetchRooms } = useGetRooms();

  useEffect(() => {
    const initializeNotifications = async () => {
      await requestPermission();
      const unsubscribe = listenToMessages(refetchRoom, refetchRooms);
      return () => {
        if (unsubscribe) unsubscribe();
      };
    };

    initializeNotifications();
  }, [refetchRoom, refetchRooms]);

  return (
    <div className="dashboard_layout">
      <Sidebar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
