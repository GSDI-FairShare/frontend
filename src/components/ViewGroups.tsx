import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Box, Divider } from '@mui/material';
import axios from 'axios';

export const ViewGroups = ({ toggleScreen }) => {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the auth token from localStorage

        if (!token) {
          setError("Error: Usuario no autenticado");
          return;
        }

        const response = await axios.get('http://localhost:5000/groups', {
          headers: {
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          }
        });

        setGroups(response.data);
      } catch (error) {
        console.error("Error al obtener los grupos:", error);
        if (error.response && error.response.data) {
          setError(error.response.data.detail);
        } else {
          setError("Error: No se pudieron obtener los grupos. Por favor, inténtelo de nuevo.");
        }
      }
    };

    fetchGroups();
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
