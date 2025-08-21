import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "../../utils/axiosInstance";

export default function useDeleteTrip(Item, setShowDeleteModal) {
  const queryClient = useQueryClient();
  const { mutate: deleteTripType, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(
        `/dashboard/adventures/${Item.id}`
      );
      return response.data;
    },

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["trip-types"]);
      setShowDeleteModal(false);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return { deleteTripType, isDeleting };
}
