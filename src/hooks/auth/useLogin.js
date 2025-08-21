import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import * as yup from "yup";
import axiosInstance from "../../utils/axiosInstance";

export default function useLogin() {
  const schema = yup.object().shape({
    email: yup.string().required("Please enter your phone number"),
    password: yup.string().required("Please enter your password"),
  });

  const [, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: submitLogin, isPending } = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();

      formData.append("email", data.email);
      formData.append("password", data.password);

      const response = await axiosInstance.post(
        "/admin/auth/login",
        formData
      );
      return response.data;
    },

    onSuccess: (data) => {
      toast.success("Login successful 🎉");

      setCookie("token", data.meta?.token, {
        path: "/",
        secure: true,
        sameSite: "Strict",
      });

      navigate("/");
    },

    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message);
    },
  });

  return {
    handleSubmit: handleSubmit(submitLogin),
    register,
    isPending,
    errors,
  };
}
