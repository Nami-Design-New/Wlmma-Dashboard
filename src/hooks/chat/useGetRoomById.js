import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { useSearchParams } from "react-router";

export default function useGetRoomById() {
    const [searchParams] = useSearchParams();
    const roomId = searchParams.get("room_id");
    const { isLoading, data, error, refetch } = useQuery({
        queryKey: ["room", roomId],
        queryFn: () => getRoomById(roomId),
        enabled: !!roomId,

    });
    return { isLoading, data, error, refetch };

}

const getRoomById = async (room_id) => {
    try {
        const res = await axiosInstance.get(`/admin/chat/messages/${room_id}`);

        if (res.status === 200) {
            return res.data;
        }
        throw new Error("Failed to fetch room");
    } catch (error) {
        console.error("Error fetching room:", error.message);
        throw new Error("Failed to fetch room");
    }
};
