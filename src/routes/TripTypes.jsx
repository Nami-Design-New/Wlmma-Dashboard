import { useEffect, useState } from "react";
import DataTable from "../components/DataTabel";
import DataLoader from "../ui/DataLoader";
import useGetTripTypes from "../hooks/settings/useGetTripTypes";
import ConfirmDeleteModal from "../ui/modals/ConfirmDeleteModal";
import useDeleteTrip from "./../hooks/actions/useDeleteTrip";
import AddTripType from "../ui/modals/AddTripType";

export default function TripTypes() {
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data: types, total, isLoading } = useGetTripTypes(page);
  const { deleteTripType, isDeleting } = useDeleteTrip(
    item,
    setShowDeleteModal
  );

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
      cell: ({ row }) => (
        <a href={row.original.image} data-fancybox={row.original.id}>
          <img
            src={row.original.image}
            alt=""
            style={{
              width: "100px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        </a>
      ),
    },
    {
      header: "Name",
      accessorKey: "name_en",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="d-flex gap-2">
          <button
            className="action_btn"
            style={{ color: "#000" }}
            onClick={() => {
              setShowModal(true);
              setItem(row.original);
            }}
          >
            <i className="fa-regular fa-pen-to-square"></i>
          </button>

          <button
            className="action_btn"
            style={{ color: "#ff0000" }}
            onClick={() => {
              setShowDeleteModal(true);
              setItem(row.original);
            }}
          >
            <i className="fa-regular fa-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <section className="form_ui">
      <div className="page_head">
        <h1>Adventures (Trip Types)</h1>
        <p>Manage your app's categories</p>
      </div>

      <div className="tab_wrapper">
        <div className="d-flex justify-content-end align-items-center">
          <button className="add_btn" onClick={() => setShowModal(true)}>
            Add Trip Type
          </button>
        </div>

        {isLoading ? (
          <DataLoader />
        ) : (
          <DataTable
            data={types}
            columns={cols}
            total={Math.ceil(total / 8)}
            page={page}
            setPage={setPage}
          />
        )}
      </div>

      <ConfirmDeleteModal
        show={showDeleteModal}
        onConfirm={() => deleteTripType()}
        loading={isDeleting}
        closeDeleteModal={() => setShowDeleteModal(false)}
        text={"Are you sure you want to delete this trip type?"}
      />

      <AddTripType
        showModal={showModal}
        setShowModal={setShowModal}
        item={item}
        setItem={setItem}
      />
    </section>
  );
}
