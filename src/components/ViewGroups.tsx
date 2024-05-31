import { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Box, Divider } from '@mui/material';
import { getDataOfMyGroupsAndMembers } from '../services/groups';

// TODO quizas se quite en un futuro el params toggle aca
export const ViewGroups = ({ toggleScreen }) => {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDataOfMyGroupsAndMembers(setError).then( (dataGroups) => { setGroups(dataGroups) } );
    //getMemberOfGroup(3,setGroupsCreated, groups, setError)
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
            <Box key={group.id} mb={2}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{group.name}</Typography>
                  <>
                    <Divider />
                    {group.members.map( (aMember,index) => {
                      return (<p key={index}> {aMember.name} <br/> {aMember.email} </p>) 
                      })}
                  </>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </div>
  );
};
