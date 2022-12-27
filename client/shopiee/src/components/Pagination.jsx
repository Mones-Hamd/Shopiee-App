import React, { useContext } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import { PostsContext } from "../context/PostsCtx";

const Paginate = () => {
  const { numberOfPages } = useContext(PostsContext);

  return (
    <Stack spacing={2}>
      <Pagination
        count={numberOfPages || 1}
        variant="outlined"
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            component={Link}
            to={`?page=${item.page}`}
          />
        )}
      />
    </Stack>
  );
};

export default Paginate;
