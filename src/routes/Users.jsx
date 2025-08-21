import { useState } from "react";
import DataTable from "../components/DataTabel";
import useGetAllUsers from "../hooks/users/useGetAllUsers";
import DataLoader from "../ui/DataLoader";
import UserModal from "../ui/modals/UserModal";

export default function Users() {
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { data: users, total, isLoading } = useGetAllUsers(page);

  const cols = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Phone Number",
      accessorKey: "phone_number",
    },
    {
      header: "Gender",
      accessorKey: "gender",
    },
    {
      header: "Join Date",
      accessorKey: "created_at",
      cell: (info) => {
        const dateString = info.getValue?.();
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString();
      },
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
        <h1>App Users</h1>
        <p>View and manage all users registered in the application</p>
      </div>

      <div className="tab_wrapper">
        {isLoading ? (
          <DataLoader />
        ) : (
          <DataTable
            data={users}
            columns={cols}
            page={page}
            total={Math.ceil(total / 8)}
            setPage={setPage}
          />
        )}
      </div>
      <UserModal showModal={showModal} item={item} handleClose={() => setShowModal(false)} />
    </section>
  );
}
