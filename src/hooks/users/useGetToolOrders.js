import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetToolOrders(toolId) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["tool-orders", toolId],
    queryFn: () => getToolOrders(toolId),
    enabled: !!toolId,
  });
  return { isLoading, data: data?.data, error };
}

const getToolOrders = async (toolId) => {
  try {
    const res = await axiosInstance.get(
      `/dashboard/commercial-tools/toolorders/${toolId}`
    );

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("Error fetching faqs:", error.message);
    throw error;
  }
};
