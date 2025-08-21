import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetAllUsers(page = 1) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["all-users", page],
    queryFn: () => getUsers(page),
  });
  return { isLoading, data: data?.data, total: data?.total, error };
}

const getUsers = async (page) => {
  try {
    const res = await axiosInstance.get(
      `/dashboard/users?per_page=8&page=${page}`
    );

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("Error fetching faqs:", error.message);
    throw error;
  }
};
