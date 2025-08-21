import { Modal } from "react-bootstrap";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "./../forms/InputField";
import SubmitButton from "../forms/SubmitButton";
import axiosInstance from "../../utils/axiosInstance";
import * as yup from "yup";

export default function AddSlideModal({
  showModal,
  setShowModal,
  item,
  setItem,
}) {
  const queryClient = useQueryClient();

  const schema = yup.object().shape({
    title_ar: yup.string().required("Please enter title in Arabic"),
    title_en: yup.string().required("Please enter name in English"),
    link: yup.string().required("Please enter link"),
    image: yup.mixed().test("fileExist", "Please select an image", (value) => {
      if (item?.id) return true;
      return !!value;
    }),
  });

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      title_ar: "",
      title_en: "",
      link: "",
      image: null,
    },
  });

  const imageFile = watch("image");

  useEffect(() => {
    if (item) {
      setValue("title_ar", item.title_ar || "");
      setValue("title_en", item.title_en || "");
      setValue("link", item.link || "");
      setValue("image", item.image || null);
    }
  }, [item, setValue]);

  const { mutate: saveSlide, isPending } = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append("title_ar", data.title_ar);
      formData.append("title_en", data.title_en);
      formData.append("link", data.link);

      if (Object.prototype.toString.call(data.image) === "[object File]") {
        formData.append("image", data.image);
      }

      const url = item?.id
        ? `/dashboard/sliders/${item.id}`
        : `/dashboard/sliders/store`;

      const response = await axiosInstance.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },

    onSuccess: (data) => {
      toast.success(data.message || "Saved successfully");
      queryClient.invalidateQueries(["app-sliders"]);
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

  const renderImagePreview = () => {
    if (imageFile && imageFile instanceof File) {
      return (
        <img
          src={URL.createObjectURL(imageFile)}
          alt="Preview"
          className="preview-img"
        />
      );
    } else if (typeof imageFile === "string") {
      return <img src={imageFile} alt="Current" className="preview-img" />;
    } else {
      return (
        <>
          <i className="fa-regular fa-image"></i>
          <h6>Click to add image</h6>
        </>
      );
    }
  };

  return (
    <Modal
      show={showModal}
      centered
      onHide={handleClose}
      aria-labelledby="slider-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="slider-modal">
          {item?.id ? "Edit Slide" : "Add Slide"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form
          className="form_ui d-flex flex-column gap-3"
          onSubmit={handleSubmit(saveSlide)}
        >
          <InputField
            label="Title Arabic"
            id="title_ar"
            {...register("title_ar")}
            error={errors?.title_ar?.message}
            placeholder="Enter title in Arabic"
          />

          <InputField
            label="Title English"
            id="title_en"
            {...register("title_en")}
            error={errors?.title_en?.message}
            placeholder="Enter title in English"
          />

          <InputField
            label="URL"
            type="url"
            id="link"
            {...register("link")}
            error={errors?.name_en?.message}
            placeholder="Enter URL"
          />

          <label htmlFor="image" className="image_fiels">
            {renderImagePreview()}
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setValue("image", file, { shouldValidate: true });
                }
              }}
            />
          </label>
          {errors?.image && (
            <small className="text-danger">{errors.image.message}</small>
          )}

          <SubmitButton
            text={item?.id ? "Update" : "Save"}
            loading={isPending}
          />
        </form>
      </Modal.Body>
    </Modal>
  );
}
