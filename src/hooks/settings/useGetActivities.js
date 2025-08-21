import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetActivities(page = 1) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["activities", page],
    queryFn: () => getTools(page),
  });
  return { isLoading, data: data?.data, total: data?.total, error };
}

const getTools = async (page) => {
  try {
    const res = await axiosInstance.get("/dashboard/admin_activities", {
      params: {
        page: page,
        per_page: 8,
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("Error fetching settings:", error.message);
    throw error;
  }
};
