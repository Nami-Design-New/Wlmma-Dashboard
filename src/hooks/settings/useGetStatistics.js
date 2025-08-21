import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetStatistics() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["statistics"],
    queryFn: () => getStatistics(),
  });
  return { isLoading, data, error };
}

const getStatistics = async () => {
  try {
    const res = await axiosInstance.get("/admin/home");

    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching settings:", error.message);
    throw error;
  }
};
