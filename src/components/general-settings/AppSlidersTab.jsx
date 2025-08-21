import { useState } from "react";
import useGetAppSlider from './../../hooks/settings/useGetAppSlider';
import useDeleteSlider from './../../hooks/actions/useDeleteSlider';
import ConfirmDeleteModal from "../../ui/modals/ConfirmDeleteModal";
import AddSlideModal from './../../ui/modals/AddSlideModal';
import DataLoader from "../../ui/DataLoader";
import DataTable from "../DataTabel";


export default function AppSlidersTab() {
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data: sliders, total, isLoading } = useGetAppSlider(page);

  const { deleteSlider, isDeleting } = useDeleteSlider(
    item,
    setShowDeleteModal
  );

  const cols = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Image",
      accessorKey: "image",
      cell: ({ row }) => (
        <img
          src={row.original.image}
          alt={`slider-${row.original.id}`}
          style={{
            width: "100px",
            height: "80px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
      ),
    },
    {
      header: "Link",
      accessorKey: "link",
    },
    {
      header: "Actions",
      accessorKey: "actions",
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
    <div className="tab_wrapper">
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">App Sliders</h5>
        <button className="add_btn" onClick={() => setShowModal(true)}>
          Add Slide
        </button>
      </div>

      {isLoading ? (
        <DataLoader />
      ) : (
        <DataTable
          data={sliders}
          columns={cols}
          total={Math.ceil(total / 8)}
          page={page}
          setPage={setPage}
        />
      )}

      <AddSlideModal
        showModal={showModal}
        setShowModal={setShowModal}
        item={item}
        setItem={setItem}
      />

      <ConfirmDeleteModal
        show={showDeleteModal}
        onConfirm={() => deleteSlider()}
        loading={isDeleting}
        closeDeleteModal={() => setShowDeleteModal(false)}
        text={"Are you sure you want to delete this slide?"}
      />
    </div>
  );
}
