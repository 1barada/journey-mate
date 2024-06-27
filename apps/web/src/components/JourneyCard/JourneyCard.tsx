import DirectionsBike from '@mui/icons-material/DirectionsBike';
import DownhillSkiing from '@mui/icons-material/DownhillSkiing';
import HelpOutline from '@mui/icons-material/HelpOutline';
import Landscape from '@mui/icons-material/Landscape';
import People from '@mui/icons-material/People';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import moment from 'moment';

import styles from './JourneyCard.module.scss';
import { JourneyCardProps } from './JourneyCard.types';

const getJourneyIcon = (journeyType: string) => {
  switch (journeyType) {
    case 'mountainTrip':
      return <Landscape />;
    case 'bicycleTrip':
      return <DirectionsBike />;
    case 'skiing':
      return <DownhillSkiing />;
    default:
      return <HelpOutline />;
  }
};

const formatDate = (date: string) => moment.utc(date).local().format('DD.MM.YY');

export const JourneyCard: React.FC<JourneyCardProps> = ({
  description,
  imageUrl,
  header,
  date, // Expecting date to be a string in UTC format
  personCount,
  journeyType,
  onClickHandler,
}) => {
  return (
    <Card className={styles.card}>
      <CardMedia className={styles.cardMedia} component="img" image={imageUrl} alt={header} />
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Typography variant="h6" component="div" className={styles.header}>
              {header}
            </Typography>
            {getJourneyIcon(journeyType)}
          </Box>
          <Typography variant="subtitle1" color="text.secondary">
            {formatDate(date)}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" className={styles.description}>
          {description}
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
          <Box display="flex" alignItems="center">
            <Avatar>
              <People />
            </Avatar>
            <Typography variant="body2" color="text.secondary" className={styles.personCount}>
              {personCount}
            </Typography>
          </Box>
          <Button variant="contained" onClick={onClickHandler}>
            Show
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
