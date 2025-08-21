import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetLandingPage() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["landing-page"],
    queryFn: () => getLanding(),
  });
  return { isLoading, data, error };
}

const getLanding = async () => {
  try {
    const res = await axiosInstance.get("landing-page-content");

    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching settings:", error.message);
    throw error;
  }
};
