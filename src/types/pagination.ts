export type PaginationComponentProps = {
    currentPage: number;
    totalPages: number;
    handlePageChange: (pageNumber: number) => void;
  }