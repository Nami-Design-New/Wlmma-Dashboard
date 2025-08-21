import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "../../utils/axiosInstance";

export default function useApproveDeclineUser(item, setShowDeleteModal, mode) {
    console.log(item);
    
  const queryClient = useQueryClient();

  const { mutate: approveOrDecline, isPending: isPending } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put("/admin/users/approve", {
        phone_number: item.provider.phone_number,
        approve: mode === "approve" ? "yes" : "no",
      });
      return response.data;
    },

    onSuccess: () => {
      toast.success(mode === "approve" ? "Approved successfully" : "Declined successfully");
      queryClient.invalidateQueries(["providers-requets"]);
      setShowDeleteModal(false);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return { approveOrDecline, isPending };
}
