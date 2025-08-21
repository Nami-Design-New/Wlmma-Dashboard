export default function SubmitButton({
  text,
  loading,
  className,
  fileLoading,
  event = undefined,
}) {
  return (
    <button
      onClick={event ? event : undefined}
      style={{ opacity: loading || fileLoading ? 0.7 : 1 }}
      disabled={loading || fileLoading}
      type="submit"
      className={`log ${className || ""}`}
    >
      {fileLoading ? "Wait File Uploading" : text}{" "}
      <i
        className={
          loading || fileLoading ? "fa-regular fa-circle-notch fa-spin" : ""
        }
      />
    </button>
  );
}
