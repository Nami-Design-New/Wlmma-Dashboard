import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetUsers(type, page = 1) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["users", type, page],
    queryFn: () => getUsers(type, page),
  });
  return { isLoading, data: data?.data, total: data?.total, error };
}

const getUsers = async (type, page) => {
  try {
    const res = await axiosInstance.get(
      `/dashboard/users/type_filter?per_page=8&page=${page}&user_types_id=${type}`
    );

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("Error fetching faqs:", error.message);
    throw error;
  }
};
