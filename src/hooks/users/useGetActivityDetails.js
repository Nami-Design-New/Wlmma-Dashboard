import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetActivityDetails(activityId) {
    const { isLoading, data, error } = useQuery({
        queryKey: ["activity", activityId],
        queryFn: () => getUsers(activityId),
        enabled: !!activityId,
    });
    return { isLoading, data: data?.data, error };
}

const getUsers = async (activityId) => {
    try {
        const res = await axiosInstance.get(
            `/dashboard/admin_activities/${activityId}`
        );

        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.error("Error fetching faqs:", error.message);
        throw error;
    }
};
