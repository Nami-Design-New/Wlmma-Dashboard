import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetSettings(type) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["settings", type],
    queryFn: () => getSetttings(type),
  });
  return { isLoading, data, error };
}

const getSetttings = async (type) => {
  try {
    const res = await axiosInstance.get(`/dashboard/settings/${type}`);

    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching settings:", error.message);
    throw error;
  }
};
