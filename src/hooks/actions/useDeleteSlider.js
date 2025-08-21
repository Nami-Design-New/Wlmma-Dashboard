import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "../../utils/axiosInstance";

export default function useDeleteSlider(Item, setShowDeleteModal) {
  const queryClient = useQueryClient();
  
  const { mutate: deleteSlider, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(
        `/dashboard/sliders/${Item.id}`
      );
      return response.data;
    },

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["app-sliders"]);
      setShowDeleteModal(false);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return { deleteSlider, isDeleting };
}
