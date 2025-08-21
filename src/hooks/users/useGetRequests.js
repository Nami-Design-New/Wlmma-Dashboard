import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetRequests(page = 1) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["providers-requets", page],
    queryFn: () => getRequests(page),
  });
  return { isLoading, data: data?.requests?.data, total: data?.requests?.total, error };
}

const getRequests = async (page) => {
  try {
    const res = await axiosInstance.get("/admin/users/providerRequests", {
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
