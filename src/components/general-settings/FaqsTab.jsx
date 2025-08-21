import { useState } from "react";
import useDeleteFaq from './../../hooks/actions/useDeleteFaq';
import useGetFaqs from './../../hooks/settings/useGetFaqs';
import AddEditFaq from "../../ui/modals/AddEditFaq";
import ConfirmDeleteModal from "../../ui/modals/ConfirmDeleteModal";
import DataTable from "../DataTabel";

export default function FaqsTab() {
  const [item, setItem] = useState({});
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { deleteFaq, isDeleting } = useDeleteFaq(item, setShowDeleteModal);
  const { data: faqs } = useGetFaqs();

  const cols = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Question",
      accessorKey: "name_en",
    },
    {
      header: "Answer",
      accessorKey: "describtion_en",
      cell: ({ row }) => (
        <p className="faq_answer">{row.original.describtion_en}</p>
      ),
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
              setItem(row.original);
              setShow(true);
            }}
          >
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
          <button
            className="action_btn"
            style={{ color: "#ff0000" }}
            onClick={() => {
              setItem(row.original);
              setShowDeleteModal(true);
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
        <h5 className="mb-0">App FAQs</h5>
        <button className="add_btn" onClick={() => setShow(true)}>
          Add FAQ
        </button>
      </div>

      <DataTable columns={cols} data={faqs} hasPagination={false} />

      <ConfirmDeleteModal
        show={showDeleteModal}
        onConfirm={() => deleteFaq()}
        loading={isDeleting}
        closeDeleteModal={() => setShowDeleteModal(false)}
        text={"Are you sure you want to delete this faq?"}
      />

      <AddEditFaq
        showModal={show}
        setShowModal={setShow}
        item={item}
        setItem={setItem}
      />
    </div>
  );
}
