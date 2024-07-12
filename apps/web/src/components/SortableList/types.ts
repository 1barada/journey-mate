import type { UniqueIdentifier } from '@dnd-kit/core';

export interface SortableBaseItem {
  id: UniqueIdentifier;
}

export interface SortableListProps<T extends SortableBaseItem> {
  items: T[];
  onChange(items: T[]): void;
  renderItem(item: T, index: number): React.ReactNode;
  className?: string;
}
