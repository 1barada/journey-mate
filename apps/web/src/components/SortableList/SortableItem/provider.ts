import { createContext, useContext } from 'react';
import type { DraggableAttributes, DraggableSyntheticListeners } from '@dnd-kit/core';

export interface SortableItemContext {
  attributes: DraggableAttributes;
  listeners: DraggableSyntheticListeners;
  ref?: (node: HTMLElement | null) => void;
}

const Context = createContext<SortableItemContext>({
  attributes: {} as DraggableAttributes,
  listeners: undefined,
});

export const SortableItemContextProvider = Context.Provider;

export const useSortableItem = () => {
  const ctx = useContext(Context);

  if (!ctx) throw new Error('Must be inside SortableItemContextProvider');

  return ctx;
};
