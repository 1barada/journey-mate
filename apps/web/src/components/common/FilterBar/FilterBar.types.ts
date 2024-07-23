export interface FilterBarProps {
  onSearchQueryChangeHandler: (searchQuery: string) => void;
  onCategoryChangeHandler: (category: string) => void;
  onDateChangeHandler: (date: string) => void;
  sinceDate?: Date;
}
