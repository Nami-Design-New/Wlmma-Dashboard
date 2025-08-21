import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetToolDetails(toolId) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["tool", toolId],
    queryFn: () => getUsers(toolId),
    enabled: !!toolId,
  });
  return { isLoading, data: data?.data, error };
}

const getUsers = async (toolId) => {
  try {
    const res = await axiosInstance.get(
      `/dashboard/commercial-tools/${toolId}`
    );

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("Error fetching faqs:", error.message);
    throw error;
  }
};
