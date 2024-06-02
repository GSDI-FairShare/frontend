import { Box, Card, CardContent, Typography, TextField, Divider } from "@mui/material"

export const PercentageDebt = (members, percentageUsers, handlerPercentages) => {
    return (
    <Box>
        <Card sx={{mt : 3, boxShadow: 5}}>
        <CardContent>
            <Typography variant="h4"> Porcentajes </Typography>
              {members.map( (aMember, index) => { return <Box key={index}>
              <Box display="flex" alignItems="center" sx={{mb: 2}}> 
                  <Box flex={1}>
                      <Typography variant="h5" gutterBottom> {aMember.username} </Typography>
                      <Typography variant="h6" gutterBottom> {aMember.email },  </Typography>
                  </Box>
                  <Box flex={1}>
                      <TextField
                        label="Porcetaje (%)"
                        fullWidth
                        required
                        value={percentageUsers[aMember.user_id]}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={ (e) => { handlerPercentages(aMember.user_id, Number(e.target.value))}}
                        margin="normal"
                        type="number"/>
                  </Box>
              </Box>
              <Divider sx={{mb:2}} />
              </Box>
            })}    
        </CardContent>
    </Card>
  </Box>)
} 


