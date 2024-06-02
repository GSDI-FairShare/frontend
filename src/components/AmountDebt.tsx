import { Box, Card, CardContent, Typography, TextField, Divider } from "@mui/material"

export const AmountDebt = (members, debtAmountUsers, handlerAmounts) => {
    return (
    <Box>
        <Card sx={{mt : 3, boxShadow: 5}}>
          <CardContent>
              <Typography variant="h4"> Montos especificos </Typography>
                {members.map( (aMember, index) => { return <Box key={index}>
                <Box display="flex" alignItems="center" sx={{mb: 2}}> 
                    <Box flex={1}>
                        <Typography variant="h5" gutterBottom> {aMember.username} </Typography>
                        <Typography variant="h6" gutterBottom> {aMember.email },  </Typography>
                    </Box>
                    <Box flex={1}>
                        <TextField
                          label="Monto ($)"
                          fullWidth
                          required
                          value={debtAmountUsers[aMember.user_id]}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={ (e) => { handlerAmounts(aMember.user_id, Number(e.target.value))}}
                          margin="normal"
                          type="number"/>
                    </Box>
                </Box>
                <Divider sx={{mb:2}} />
                </Box>
              })}    
          </CardContent>
        </Card>
      </Box> 
)
} 