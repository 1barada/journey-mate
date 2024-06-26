import React from 'react';
import { DirectionsBike, DownhillSkiing, HelpOutline, Landscape, People } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';

interface JourneyCardProps {
  description: string;
  imageUrl: string;
  header: string;
  date: string;
  personCount: number;
  journeyType: string;
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

export const JourneyCard: React.FC<JourneyCardProps> = ({
  description,
  imageUrl,
  header,
  date,
  personCount,
  journeyType,
}) => {
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
            {date}
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
          <Button variant="contained">Show</Button>
        </Box>
      </CardContent>
    </Card>
  );
};
