import { Modal } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { toast } from "sonner";
import InputField from "../forms/InputField";
import SubmitButton from "../forms/SubmitButton";
import axiosInstance from "../../utils/axiosInstance";
import * as yup from "yup";

export default function AddEditFaq({ showModal, setShowModal, item, setItem }) {
  const queryClient = useQueryClient();

  const schema = yup.object().shape({
    name_ar: yup.string().required("Please enter name in Arabic"),
    name_en: yup.string().required("Please enter name in English"),
    describtion_ar: yup.string().required("Please enter description in Arabic"),
    describtion_en: yup
      .string()
      .required("Please enter description in English"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name_ar: "",
      name_en: "",
      describtion_ar: "",
      describtion_en: "",
    },
  });

  useEffect(() => {
    if (item) {
      setValue("name_ar", item.name_ar || "");
      setValue("name_en", item.name_en || "");
      setValue("describtion_ar", item.describtion_ar || "");
      setValue("describtion_en", item.describtion_en || "");
    }
  }, [item, setValue]);

  const { mutate: saveFaq, isPending } = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append("name_ar", data.name_ar);
      formData.append("name_en", data.name_en);
      formData.append("describtion_ar", data.describtion_ar);
      formData.append("describtion_en", data.describtion_en);

      const url = item?.id
        ? `/dashboard/faqs/update/${item.id}`
        : `/dashboard/faqs/store`;

      const response = await axiosInstance.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },

    onSuccess: (data) => {
      toast.success(data.message || "Saved successfully");
      queryClient.invalidateQueries(["faqs"]);
      handleClose();
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  const handleClose = () => {
    setShowModal(false);
    reset();
    setItem(null);
  };

  return (
    <Modal
      show={showModal}
      centered
      onHide={handleClose}
      aria-labelledby="faq-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="faq-modal">
          {item?.id ? "Edit FAQ" : "Add FAQ"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form
          className="form_ui d-flex flex-column gap-3"
          onSubmit={handleSubmit(saveFaq)}
        >
          <InputField
            label="Name Arabic"
            type="text"
            id="name_ar"
            {...register("name_ar")}
            error={errors?.name_ar?.message}
            placeholder="Enter name in Arabic"
          />

          <InputField
            label="Name English"
            type="text"
            id="name_en"
            {...register("name_en")}
            error={errors?.name_en?.message}
            placeholder="Enter name in English"
          />

          <InputField
            label="Description Arabic"
            as="textarea"
            id="describtion_ar"
            {...register("describtion_ar")}
            error={errors?.describtion_ar?.message}
            placeholder="Enter description in Arabic"
          />

          <InputField
            label="Description English"
            as="textarea"
            id="describtion_en"
            {...register("describtion_en")}
            error={errors?.describtion_en?.message}
            placeholder="Enter description in English"
          />

          <SubmitButton
            text={item?.id ? "Update" : "Save"}
            loading={isPending}
          />
        </form>
      </Modal.Body>
    </Modal>
  );
}
