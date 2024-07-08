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
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import styles from './JourneyCard.module.scss';
import { JourneyCardProps, Status } from './JourneyCard.types';

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

const getStatusColor = (status: Status) => {
  switch (status) {
    case Status.NotStarted:
      return 'primary';
    case Status.InProgress:
      return 'warning';
    default:
      return 'error';
  }
};

dayjs.extend(utc);
dayjs.extend(timezone);
const formatDate = (date: string) => dayjs.utc(date).local().format('DD.MM.YY');

export const JourneyCard: React.FC<JourneyCardProps> = ({
  description,
  imageUrl,
  header,
  date, // Expecting date to be a string in UTC format
  personCount,
  journeyType,
  onClickHandler,
  status,
}) => {
  return (
    <Card className={styles.card}>
      <CardMedia className={styles.cardMedia} component="img" image={imageUrl} alt={header} />
      <CardContent>
        <Box className={styles.flexCenterBetween}>
          <Box className={styles.flexCenter}>
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
        <Box className={styles.flexCenterBetween} mt={2}>
          <Box className={styles.flexCenter}>
            <Avatar>
              <People />
            </Avatar>
            <Typography variant="body2" color="text.secondary" className={styles.personCount}>
              {personCount}
            </Typography>
            <Chip className={styles.chip} size="small" label={status} color={getStatusColor(status)} />
          </Box>
          <Button variant="contained" onClick={onClickHandler}>
            Show
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
