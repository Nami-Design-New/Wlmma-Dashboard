import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import axiosInstance from "../../utils/axiosInstance";

export default function useLogout() {
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.get("/admin/logout");
      return response.data;
    },

    onSuccess: (data) => {
      toast.success("Logout successful 🎉");
      console.log(data);
      navigate("/login");
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return {
    logout,
    isPending,
  };
}
