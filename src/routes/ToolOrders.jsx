import { useEffect, useState } from "react";
import { Fancybox } from "@fancyapps/ui";
import DataTable from "../components/DataTabel";
import useGetTools from "../hooks/settings/useGetTools";
import DataLoader from "../ui/DataLoader";
import ToolView from "../ui/modals/ToolView";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export default function ToolOrders() {
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { data: tools, total, isLoading } = useGetTools(page);

  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {});
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
        const images = row.original.tool_images || [];
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

            {images.length == 0 && (
              <img
                src="/images/headerLogo.svg"
                alt=""
                style={{
                  width: "100px",
                  height: "80px",
                  objectFit: "contain",
                  borderRadius: "4px",
                }}
              />
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
      header: "Name",
      accessorKey: "name_en",
    },
    {
      header: "Price",
      accessorKey: "price",
    },
    {
      header: "Provider",
      accessorKey: "user.name",
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
        <h1>Commercial Tools</h1>
        <p>View and manage all orders for tools</p>
      </div>

      <div className="tab_wrapper">
        {isLoading ? (
          <DataLoader />
        ) : (
          <DataTable
            data={tools}
            columns={cols}
            total={Math.ceil(total / 8)}
            page={page}
            setPage={setPage}
          />
        )}
      </div>
      <ToolView
        showModal={showModal}
        item={item}
        handleClose={() => setShowModal(false)}
      />
    </section>
  );
}
