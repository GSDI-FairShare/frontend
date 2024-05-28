import React from 'react';
import { Typography, Card, CardContent, List, ListItem, ListItemText, Box, Divider } from '@mui/material';

export const ViewGroups = ({ groups, toggleScreen }) => {
  return (
    <div>
      <div>
        <h1>Grupos creados</h1>
      </div>
      {groups.length === 0 ? (
        <center><Typography>No hay grupos creados.</Typography></center>
      ) : (
        <Box>
          {groups.map((group, index) => (
            <Box key={index} mb={2}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{group.name}</Typography>
                  <Divider />
                  <List>
                    {group.members.map((member, idx) => (
                      <ListItem key={idx} disableGutters>
                        <ListItemText 
                          primary={
                            <Box component="span" sx={{ wordBreak: 'break-word' }}>
                              {member}
                            </Box>
                          } 
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </div>
  );
};
