import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetAppSlider(page = 1) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["app-sliders", page],
    queryFn: () => getAppSliders(page),
  });
  return { isLoading, data: data?.data, total: data?.total, error };
}

const getAppSliders = async (page) => {
  try {
    const res = await axiosInstance.get("/dashboard/sliders", {
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
