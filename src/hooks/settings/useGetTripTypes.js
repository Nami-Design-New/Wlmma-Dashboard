import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetTripTypes(page = 1) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["trip-types", page],
    queryFn: () => getTypes(page),
  });
  return { isLoading, data: data?.data, total: data?.total, error };
}

const getTypes = async (page) => {
  try {
    const res = await axiosInstance.get("/dashboard/adventures", {
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
