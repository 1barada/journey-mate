export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}
