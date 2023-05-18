import { Pagination } from "@mui/material";

function PrettierPagination({ count, page, onChange }) {
  return (
    <div
      style={{
        margin: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Pagination
        count={count}
        shape="rounded"
        page={page}
        onChange={onChange}
      />
    </div>
  );
}

export default PrettierPagination;
