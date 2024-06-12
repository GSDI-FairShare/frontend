import { useEffect } from 'react';
import { Typography, Card, CardContent, Box, Divider } from '@mui/material';
import { getDataOfMyGroupsAndHisMembers } from '../services/groups';
import { UseError } from '../hooks/useError';
import { UseGroupsBasic } from '../hooks/useGroupsBasic';

export const ViewGroups = () => {
  const { groups, setGroups } = UseGroupsBasic();
  const { error, setError } = UseError();

  useEffect(() => {
    getDataOfMyGroupsAndHisMembers(setError).then((dataGroups: any[] | undefined) => {
      console.log("Data Groups:", dataGroups); // Log para verificar la estructura de los datos
      setGroups(dataGroups || [] as any);
      setError({ activate: false, message: ''});
    });
  }, [setError, setGroups]);

  return (
    <Box>
      <h1>Grupos creados</h1>
      {error.activate ? (
        <center><Typography>{error.message}</Typography></center>
      ) : groups.length === 0 ? (
        <center><Typography>No hay grupos creados.</Typography></center>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {groups.map((group: any) => (
            <Box key={group.id} mb={2} flex="1 1 300px" maxWidth="calc(100%)">
              <Card sx={{ mt: 3, boxShadow: 5 }}>
                <CardContent>
                  <Typography variant="h4" gutterBottom>{group.name}</Typography>
                  <Divider />
                  <Typography variant="h5">Descripción: {group.description}</Typography>
                  <Divider sx={{ mb: 1 }} />
                  {group.members.map((aMember: any, index: number) => (
                    <Box key={index} mt={1} mb={3}>
                      <Typography>Integrante {index + 1}:</Typography>
                      <Typography>Nombre: {aMember.name}</Typography>
                      <Typography>Email: {aMember.email}</Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
