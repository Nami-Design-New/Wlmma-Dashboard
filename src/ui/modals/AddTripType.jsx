import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal } from "react-bootstrap";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import InputField from "../forms/InputField";
import SubmitButton from "../forms/SubmitButton";
import axiosInstance from "../../utils/axiosInstance";
import * as yup from "yup";

export default function AddTripType({
  showModal,
  setShowModal,
  item,
  setItem,
}) {
  const queryClient = useQueryClient();

  const schema = yup.object().shape({
    name_ar: yup.string().required("Please enter name in Arabic"),
    name_en: yup.string().required("Please enter name in English"),
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
      name_ar: "",
      name_en: "",
      image: null,
    },
  });

  const imageFile = watch("image");

  useEffect(() => {
    if (item) {
      setValue("name_ar", item.name_ar || "");
      setValue("name_en", item.name_en || "");
      setValue("image", item.image || null);
    }
  }, [item, setValue]);

  const { mutate: saveTripType, isPending } = useMutation({
    mutationFn: async (data) => {
      console.log(data);

      const formData = new FormData();
      formData.append("name_ar", data.name_ar);
      formData.append("name_en", data.name_en);

      if (Object.prototype.toString.call(data.image) === "[object File]") {
        formData.append("image", data.image);
      }

      const url = item?.id
        ? `/dashboard/adventures/${item.id}`
        : `/dashboard/adventures/store`;

      const response = await axiosInstance.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },

    onSuccess: (data) => {
      toast.success(data.message || "Saved successfully");
      queryClient.invalidateQueries(["trip-types"]);
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
      aria-labelledby="trip-type-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="trip-type-modal">
          {item?.id ? "Edit Trip Type" : "Add Trip Type"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form
          className="form_ui d-flex flex-column gap-3"
          onSubmit={handleSubmit(saveTripType)}
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
