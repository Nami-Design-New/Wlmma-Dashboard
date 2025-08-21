import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function DataTable({
  data,
  columns,
  page,
  total,
  setPage,
  hasPagination = true,
}) {
  const table = useReactTable({
    data: data || [],
    columns,
    manualPagination: true,
    pageCount: total,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: 8,
      },
    },
    getCoreRowModel: getCoreRowModel(),
  });

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (total <= maxVisiblePages) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (page > 3) {
        pages.push("...");
      }
      const start = Math.max(2, page - 1);
      const end = Math.min(total - 1, page + 1);

      for (let i = start; i <= end; i++) {
        if (i > 1 && i < total) {
          pages.push(i);
        }
      }
      if (page < total - 2) {
        pages.push("...");
      }
      pages.push(total);
    }

    return pages;
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {hasPagination && (
        <div className="pagination">
          <div className="pagination_controls">
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              aria-label="First page"
            >
              <i className="fa-light fa-angle-double-left"></i>
            </button>

            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              aria-label="Previous page"
            >
              <i className="fa-light fa-angle-left"></i>
            </button>

            <div className="numbers">
              {getPageNumbers().map((p, index) =>
                p === "..." ? (
                  <span key={`ellipsis-${index}`} className="ellipsis">
                    ...
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={page === p ? "active" : ""}
                    aria-label={`Page ${p}`}
                    aria-current={page === p ? "page" : undefined}
                  >
                    {p}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, total))}
              disabled={page === total}
              aria-label="Next page"
            >
              <i className="fa-light fa-angle-right"></i>
            </button>

            <button
              onClick={() => setPage(total)}
              disabled={page === total}
              aria-label="Last page"
            >
              <i className="fa-light fa-angle-double-right"></i>
            </button>
          </div>

          <span>
            Page {page} of {total}
          </span>
        </div>
      )}
    </div>
  );
}
