export interface Category {
  id: number;
  title: string;
  value: string;
}

export interface CategoriesTagListProps {
  categories: Category[];
}
