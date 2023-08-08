// PaginationComponent.js
import React from "react";
import { Pagination } from "react-bootstrap";
import { PaginationComponentProps } from "../types/pagination";

const PaginationComponent = ({
  currentPage,
  totalPages,
  handlePageChange,
}: PaginationComponentProps) => {
  return (
    <Pagination className="pagination">
      <Pagination.Prev
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {Array.from({ length: totalPages }, (_, index) => (
        <Pagination.Item
          key={index + 1}
          active={currentPage === index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={currentPage === index + 1 ? "active" : ""}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default PaginationComponent;
