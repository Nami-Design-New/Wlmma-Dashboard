import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "../../utils/axiosInstance";

export default function useDeleteFaq(item, setShowDeleteModal) {
  const queryClient = useQueryClient();

  const { mutate: deleteFaq, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(
        `/dashboard/faqs/delete/${item.id}`
      );
      return response.data;
    },

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["faqs"]);
      setShowDeleteModal(false);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return { deleteFaq, isDeleting };
}
