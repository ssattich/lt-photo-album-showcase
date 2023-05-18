import { Pagination } from "@mui/material";
import { useState } from "react";

function PrettierPagination({ count, page, onChange }) {
  const calculateSize = () =>
    window.innerWidth < 600
      ? "small"
      : window.innerWidth < 1280
      ? "medium"
      : "large";

  const [size, setSize] = useState(calculateSize());

  window.addEventListener("resize", () => setSize(calculateSize()));

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
        size={size}
      />
    </div>
  );
}

export default PrettierPagination;
