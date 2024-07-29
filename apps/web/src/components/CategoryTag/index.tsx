import React from 'react';

import styles from './CategoryTag.module.scss';
import type { CategoryTagProps } from './CategoryTag.types';

function getJourneyColor(journeyType: string): string {
  const colors: { [key: string]: string } = {
    Bike: '#FF5722',
    Cultural: '#2196F3',
    'Foot walk': '#4CAF50',
    'Long distance': '#FFC107',
    Mountain: '#E91E63',
    Wilderness: '#00BCD4',
  };

  return colors[journeyType] || '#FFFFFF';
}

export const CategoryTag: React.FC<CategoryTagProps> = ({ category }) => {
  return (
    <li
      style={{
        backgroundColor: getJourneyColor(category.title),
      }}
      className={styles.categoryTag}
    >
      #{category.title}
    </li>
  );
};
