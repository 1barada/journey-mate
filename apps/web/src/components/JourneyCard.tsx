import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DirectionsBike, DownhillSkiing, HelpOutline, Landscape, People } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { format } from 'date-fns';

interface JourneyCardProps {
  description: string;
  imageUrl: string;
  header: string;
  date: Date;
  personCount: number;
  journeyType: string;
  hashId: string;
}

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

const formatDate = (date: Date) => format(date, 'dd.MM.yy');

export const JourneyCard: React.FC<JourneyCardProps> = ({
  description,
  imageUrl,
  header,
  date,
  personCount,
  journeyType,
  hashId,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ width: 400, height: 400, elevation: 0, border: '1px solid rgba(0, 0, 0, 0.12)', backgroundColor: 'white' }}
    >
      <CardMedia sx={{ height: 220 }} component="img" image={imageUrl} alt={header} />
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Typography
              variant="h6"
              component="div"
              sx={{ width: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {header}
            </Typography>
            {getJourneyIcon(journeyType)}
          </Box>
          <Typography variant="subtitle1" color="text.secondary">
            {formatDate(date)}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
          <Box display="flex" alignItems="center">
            <Avatar>
              <People />
            </Avatar>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {personCount}
            </Typography>
          </Box>
          <Button variant="contained" onClick={() => navigate(`/event/${hashId}`)}>
            Show
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
