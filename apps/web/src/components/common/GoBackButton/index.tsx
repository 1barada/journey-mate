import { Button } from '@mui/material';

import styles from './styles.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

export function GoBackButton() {
  const navigate = useNavigate();
  const { key } = useLocation();
  const disabled = key === 'default';

  function handleClick() {
    if (disabled) return;

    navigate(-1);
  }

  return (
    <Button className={styles.button} onClick={handleClick} disabled={disabled}>
      Back
    </Button>
  );
}
