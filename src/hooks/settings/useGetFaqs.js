import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetFaqs() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["faqs"],
    queryFn: () => getFaqs(),
  });
  return { isLoading, data, error };
}

const getFaqs = async () => {
  try {
    const res = await axiosInstance.get("/dashboard/faqs");
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching settings:", error.message);
    throw error;
  }
};
