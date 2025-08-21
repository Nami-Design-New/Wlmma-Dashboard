import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetUserDetails(userId) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUsers(userId),
    enabled: !!userId,
  });
  return { isLoading, data: data?.requests, error };
}

const getUsers = async (userId) => {
  try {
    const res = await axiosInstance.get(
      `/admin/users/details/${userId}`
    );

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("Error fetching faqs:", error.message);
    throw error;
  }
};
