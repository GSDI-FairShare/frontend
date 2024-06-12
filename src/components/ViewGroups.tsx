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
      setGroups(dataGroups || [] as any);
    });
  }, []);


  return (
    <Box>
      <h1>Grupos creados</h1>
      {error ? (
        <center><Typography>{error}</Typography></center>) : groups.length === 0 ?
        ( <center><Typography>No hay grupos creados.</Typography></center>) : (
        <Box display="flex" flexWrap="wrap" gap={2} >
          {groups.map((group: any) => (
            <Box key={group.id} mb={2} flex="1 1 300px" maxWidth="calc(100%)"  >
              <Card sx={{mt : 3, boxShadow: 5}} >
                <CardContent>
                  <Typography variant="h4" gutterBottom>{group.name}</Typography>
                  <Divider />
                  <Typography variant="h5" > Descripcion: {group.description}</Typography>
                    <Divider sx={{mb: 1}} />
                    {group.members.map((aMember: any, index: any) => {
                      return (<Box key={index} mt={1} mb={3}  >
                        <Typography> Integrante {index+1}: </Typography>
                        <Typography> nombre: {aMember.name} </Typography>
                        <Typography> email: {aMember.email} </Typography>
                        </Box>
                      )}) }
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
