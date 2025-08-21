import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetRooms() {
    const { isLoading, data, error, refetch } = useQuery({
        queryKey: ["rooms"],
        queryFn: () => getRooms(),
    });
    return { isLoading, data, error, refetch};
}

const getRooms = async () => {
    try {
        const res = await axiosInstance.get("/admin/chat/getUserRooms");

        if (res.status === 200) {
            return res.data.rooms;
        }
        throw new Error("Failed to fetch rooms");
    } catch (error) {
        console.error("Error fetching rooms:", error.message);
        throw new Error("Failed to fetch rooms");
    }
};
