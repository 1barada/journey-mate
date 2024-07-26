import { useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';

import styles from './CardDescription.module.scss';

interface CardDescriptionProps {
  description: string;
  isEdited?: boolean;
  setIsEdited?: (args: boolean) => void;
  title: string;
  handleEditDescription?: (description: string) => void;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({
  description,
  isEdited,
  setIsEdited,
  title,
  handleEditDescription,
}) => {
  const [isEllipsis, setIsEllipsis] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [editedDescription, setEditedDescription] = useState<string>(description);

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

  const handleEditChangeClick = () => {
    if (handleEditDescription) {
      handleEditDescription(editedDescription);
      if (setIsEdited) setIsEdited(false);
    }
  };

  const editModeClose = () => {
    if (setIsEdited) {
      setIsEdited(false);
    }
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h4" component="h2" className={styles.title}>
        {title}
      </Typography>
      <Box className={styles.contentWrapper}>
        {isEdited ? (
          <>
            <IconButton onClick={editModeClose} className={styles.closeBtn}>
              <CloseIcon />
            </IconButton>
            <TextField
              className={styles.editArea}
              value={editedDescription}
              multiline
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <Typography component="p" className={styles.limit}>
              <Typography component="span" className={`${editedDescription?.length >= 1000 && styles.overLimit} `}>
                {editedDescription?.length}
              </Typography>
              /1000
            </Typography>
            <Button
              onClick={handleEditChangeClick}
              disabled={editedDescription?.length > 1000}
              className={styles.editBtn}
            >
              Edit
            </Button>
          </>
        ) : (
          <Typography
            variant="body1"
            className={`${styles.content} ${showMore ? '' : styles.contentEllipsis}`}
            ref={contentRef}
          >
            {description}
          </Typography>
        )}
        {isEllipsis && !isEdited && (
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
