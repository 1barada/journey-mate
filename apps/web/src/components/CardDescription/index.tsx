import { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

import styles from './CardDescription.module.scss';

interface CardDescriptionProps {
  description: string;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ description }) => {
  const [isEllipsis, setIsEllipsis] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current === null) return;

    function isEllipsisActive(e: HTMLElement) {
      return e.offsetHeight < e.scrollHeight;
    }

    setIsEllipsis(isEllipsisActive(contentRef.current));
  }, [description, contentRef]);

  function handleShowMore() {
    setShowMore((prev) => !prev);
  }

  return (
    <Box className={styles.container}>
      <Typography variant="h4" component="div" className={styles.title}>
        Description
      </Typography>
      <Box className={styles.contentWrapper}>
        <Typography
          variant="body1"
          className={`${styles.content} ${showMore ? '' : styles.contentEllipsis}`}
          ref={contentRef}
        >
          {description}
        </Typography>
        {isEllipsis && (
          <Box className={styles.contentShowMoreWrapper}>
            <Button className={styles.contentShowMore} disableRipple onClick={handleShowMore}>
              {showMore ? 'show less' : 'show more'}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
