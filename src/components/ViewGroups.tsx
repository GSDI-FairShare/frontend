import { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Box, Divider } from '@mui/material';
import { getGroups } from '../services/groups';

// TODO quizas se quite en un futuro el params toggle aca
export const ViewGroups = ({ toggleScreen }) => {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getGroups(setGroups, setError);
  }, []);

  return (
    <div>
      <div>
        <h1>Grupos creados</h1>
      </div>
      {error ? (
        <center><Typography>{error}</Typography></center>
      ) : groups.length === 0 ? (
        <center><Typography>No hay grupos creados.</Typography></center>
      ) : (
        <Box>
          {groups.map((group, index) => (
            <Box key={index} mb={2}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{group.name}</Typography>
                  {group.description && (
                    <>
                      <Divider />
                      <Typography variant="body2" color="textSecondary">{group.description}</Typography>
                    </>
                  )}
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </div>
  );
};
