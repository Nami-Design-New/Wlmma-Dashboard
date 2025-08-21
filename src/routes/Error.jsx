import { Link, useRouteError, isRouteErrorResponse } from "react-router";

export default function Error() {
  const error = useRouteError();

  const getErrorDetails = () => {
    if (isRouteErrorResponse(error)) {
      return {
        status: error.status,
        title: error.status === 404 ? "Page Not Found" : "Something Went Wrong",
        message:
          error.status === 404
            ? "The page you're looking for doesn't exist."
            : "An unexpected error occurred while processing your request.",
      };
    }

    if (error instanceof Error) {
      return {
        status: 500,
        title: "Application Error",
        message: "An unexpected error occurred while processing your request.",
      };
    }

    return {
      status: 500,
      title: "Unexpected Error",
      message: "Something unexpected happened. Please try again later.",
    };
  };

  const { status, title, message } = getErrorDetails();

  return (
    <div className="error-page">
      <div className="container">
        <img src="/icons/error.svg" alt={`Error ${status}`} />

        <h1 className="error-title">
          Oops! {title} ({status})
        </h1>

        <p className="error-description">{message}</p>

        <Link to="/">Return to Home</Link>
      </div>
    </div>
  );
}
