import { useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import JoditEditor from "jodit-react";
import useGetSettings from "../../hooks/settings/useGetSettings";
import axiosInstance from "../../utils/axiosInstance";
import SubmitButton from "../../ui/forms/SubmitButton";
import DataLoader from "../../ui/DataLoader";

export default function SettingTab({ title, type }) {
  const contentRef = useRef({ describtion_ar: "", describtion_en: "" });
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { data: settings, isLoading } = useGetSettings(type);

  const editorConfig = {
    readonly: false,
    placeholder: "Start typing here...",
    height: 350,
  };

  useEffect(() => {
    if (settings && !initialLoaded) {
      contentRef.current = {
        describtion_ar: settings.describtion_ar || "",
        describtion_en: settings.describtion_en || "",
      };
      setInitialLoaded(true); // trigger re-render once
    }
  }, [settings, initialLoaded]);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await axiosInstance.put(
        `/dashboard/settings/update/${type}`,
        contentRef.current
      );

      if (res.status === 200) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error saving data");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className="tab_wrapper" onSubmit={handleSave}>
      <div className="input-field mb-3">
        <h6>{title}</h6>

        {isLoading || !initialLoaded ? (
          <DataLoader />
        ) : (
          <>
            <div className="d-flex flex-column gap-2 mb-3">
              <label>Description (Arabic)</label>
              <JoditEditor
                config={editorConfig}
                value={contentRef.current.describtion_ar}
                onBlur={(value) => (contentRef.current.describtion_ar = value)}
              />
            </div>

            <div className="d-flex flex-column gap-2">
              <label>Description (English)</label>
              <JoditEditor
                config={editorConfig}
                value={contentRef.current.describtion_en}
                onBlur={(value) => (contentRef.current.describtion_en = value)}
              />
            </div>
          </>
        )}
      </div>

      <div className="d-flex justify-content-end">
        <SubmitButton text="Save" loading={isSaving} />
      </div>
    </form>
  );
}
