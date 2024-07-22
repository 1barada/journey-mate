import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { AboutPageInfo } from '../../components/common/AboutPageInfo';
import { NewJourneyForm } from '../../components/NewJourneyForm';

import styles from './CreateJourneyPage.module.scss';

const CreateJourneyPage: React.FC = () => {
  return (
    <>
      <AboutPageInfo info="New journey" />
      <Container className={styles.createJourneyPage}>
        <Box component="div" className={styles.contentWrapper}>
          <NewJourneyForm />
        </Box>
      </Container>
    </>
  );
};

export default CreateJourneyPage;
