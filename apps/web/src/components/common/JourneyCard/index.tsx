import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import People from '@mui/icons-material/People';
import TerrainIcon from '@mui/icons-material/Terrain';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { Map } from '../Map';
import { MapWrapper } from '../MapWrapper';

import styles from './JourneyCard.module.scss';
import { JourneyCardProps, Status } from './JourneyCard.types';

function getJourneyIcon(journeyType: string) {
  switch (journeyType) {
    case 'Bike':
      return <DirectionsBikeIcon />;
    case 'Cultural':
      return <TravelExploreIcon />;
    case 'Foot walk':
      return <DirectionsWalkIcon />;
    case 'Long distance':
      return <FlightTakeoffIcon />;
    case 'Mountain':
      return <TerrainIcon />;
    case 'Wilderness':
      return <LocalFloristIcon />;
    default:
      return null; // Return null or a default icon if journey type is unknown
  }
}

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
const formatDate = (date: string) => dayjs.utc(date).local().format('MM/DD/YY');

export const JourneyCard: React.FC<JourneyCardProps> = ({
  description,
  header,
  startDate, // Expecting date to be a string in UTC format
  endDate, // Expecting date to be a string in UTC format
  personCount,
  journeyType,
  onClickHandler,
  coordinates,
}) => {
  const currentUtcTime = dayjs.utc().format('YYYY-MM-DD HH:mm:ss');
  let status = Status.NotStarted;
  if (startDate < currentUtcTime && currentUtcTime < endDate) {
    status = Status.InProgress;
  } else if (currentUtcTime > endDate) {
    status = Status.Completed;
  }

  return (
    <Card className={styles.card}>
      <MapWrapper>
        <Map width="100%" height="58%" coordinates={coordinates} />
      </MapWrapper>
      <CardContent>
        <Box className={styles.flexCenterBetween}>
          <Box className={styles.flexCenter}>
            <Typography variant="h6" component="div" className={styles.header}>
              {header}
            </Typography>
            {getJourneyIcon(journeyType)}
          </Box>
          <Typography variant="subtitle1" color="text.secondary">
            {formatDate(startDate)}
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
