import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetAtivityBookings(activityId) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["activity-bookings", activityId],
    queryFn: () => getActivityBookings(activityId),
    enabled: !!activityId,
  });
  return { isLoading, data: data?.data, error };
}

const getActivityBookings = async (activityId) => {
  try {
    const res = await axiosInstance.get(
      `/dashboard/admin_activities/alltripBookings/${activityId}`
    );

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("Error fetching faqs:", error.message);
    throw error;
  }
};
