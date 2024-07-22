import { Fragment, useMemo, useState } from 'react';
import type { Active, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import List from '@mui/material/List';
import clsx from 'clsx';

import { SortableOverlay } from './SortableOverlay';
import styles from './styles.module.scss';
import type { SortableBaseItem, SortableListProps } from './types';

export const SortableList = <T extends SortableBaseItem>({
  items,
  onSwap,
  onBeforeSwap,
  renderItem,
  className,
}: SortableListProps<T>) => {
  const [active, setActive] = useState<Active | null>(null);
  const activeItem = useMemo(() => items.find((item) => item.id === active?.id), [active, items]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragStart = ({ active }: DragStartEvent) => {
    setActive(active);
  };
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over?.id) {
      const activeIndex = items.findIndex(({ id }) => id === active.id);
      const overIndex = items.findIndex(({ id }) => id === over.id);

      onBeforeSwap?.(items[activeIndex], items[overIndex]);
      onSwap(arrayMove(items, activeIndex, overIndex));
    }
    setActive(null);
  };
  const onDragCancel = () => {
    setActive(null);
  };

  return (
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragCancel={onDragCancel}>
      <SortableContext items={items}>
        <List className={clsx(styles.list, className)}>
          {items.map((item, index) => (
            <Fragment key={item.id}>{renderItem(item, index)}</Fragment>
          ))}
        </List>
      </SortableContext>
      <SortableOverlay>{activeItem ? renderItem(activeItem, items.indexOf(activeItem)) : null}</SortableOverlay>
    </DndContext>
  );
};
