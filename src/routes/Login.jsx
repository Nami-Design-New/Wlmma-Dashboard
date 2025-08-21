import InputField from "../ui/forms/InputField";
import PasswordField from "../ui/forms/PasswordField";
import SubmitButton from "../ui/forms/SubmitButton";
import useLogin from "../hooks/auth/useLogin";

export default function Login() {
  const { register, handleSubmit, errors, isPending } = useLogin();

  return (
    <section className="login_section">
      <div className="auth_form">
        <form className="form_ui" onSubmit={handleSubmit}>
          <div className="header">
            <div className="logo">
              <img src="/images/headerLogo.svg" alt="" />
            </div>
            <div className="text">
              <h2>Welcome ..!</h2>
              <p>
                Enter the registered account on our platform to complete the
                login or create a new account ...
              </p>
            </div>
          </div>

          <InputField
            label="Email Address"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            error={errors?.email?.message}
            {...register("email")}
          />

          <PasswordField
            label="Password"
            id="password"
            name="password"
            placeholder="Enter your password"
            error={errors?.password?.message}
            {...register("password")}
          />

          <SubmitButton text="Login" className="mt-2" loading={isPending} />
        </form>
      </div>

      <div className="img">
        <img src="/images/auth.jpg" alt="login" />
      </div>
    </section>
  );
}
