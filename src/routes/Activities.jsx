import { useEffect, useState } from "react";
import DataTable from "../components/DataTabel";
import useGetActivities from "../hooks/settings/useGetActivities";
import DataLoader from "../ui/DataLoader";
import ActivityView from "../ui/modals/ActivityView";

export default function Activities() {
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { data: activities, total, isLoading } = useGetActivities(page);

  useEffect(() => {
    import("@fancyapps/ui").then(({ Fancybox }) => {
      Fancybox.bind("[data-fancybox]", {});
    });
  }, []);

  const cols = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Image",
      accessorKey: "image",
      cell: ({ row }) => {
        const images = row.original.activity_images || [];
        const groupName = `gallery-${row.original.id}`;

        return (
          <>
            {images.length > 0 && (
              <a href={images[0].image_path} data-fancybox={groupName}>
                <img
                  src={images[0].image_path}
                  alt={`tool-${row.original.id}`}
                  style={{
                    width: "100px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              </a>
            )}

            {images.slice(1).map((img, idx) => (
              <a
                key={idx}
                href={img.image_path}
                data-fancybox={groupName}
                style={{ display: "none" }}
              >
                Hidden Image
              </a>
            ))}
          </>
        );
      },
    },
    {
      header: "Title",
      accessorKey: "title_en",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "City",
      accessorKey: "city_name_en",
    },
    {
      header: "Price",
      accessorKey: "price",
    },
    {
      header: "Capacity",
      accessorKey: "capacity",
    },
    {
      header: "Rate",
      accessorKey: "average_rating",
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }) => (
        <div className="d-flex gap-2">
          <button
            className="action_btn"
            style={{ color: "#00adff" }}
            onClick={() => {
              setShowModal(true);
              setItem(row.original);
            }}
          >
            <i className="fa-regular fa-eye"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <section className="form_ui">
      <div className="page_head">
        <h1>Reservations</h1>
        <p>View and manage all user bookings and schedules</p>
      </div>

      <div className="tab_wrapper">
        {isLoading ? (
          <DataLoader />
        ) : (
          <DataTable
            data={activities}
            columns={cols}
            total={Math.ceil(total / 8)}
            page={page}
            setPage={setPage}
          />
        )}
      </div>

      <ActivityView
        showModal={showModal}
        item={item}
        handleClose={() => setShowModal(false)}
      />
    </section>
  );
}
