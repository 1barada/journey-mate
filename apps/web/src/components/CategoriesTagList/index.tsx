import React from 'react';

import { CategoryTag } from '../CategoryTag';

import styles from './CategoriesTagList.module.scss';
import type { CategoriesTagListProps } from './CategoriesTagList.types';

const CategoriesTagList: React.FC<CategoriesTagListProps> = ({ categories }) => {
  return (
    <>
      {categories.length > 0 && (
        <ul className={styles.categoriesTagList}>
          {categories.map((category) => (
            <CategoryTag key={category.id} category={category} />
          ))}
        </ul>
      )}
    </>
  );
};

export default CategoriesTagList;
