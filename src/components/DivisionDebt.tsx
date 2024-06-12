import { Box, Card, CardContent, Typography, TextField, Divider } from "@mui/material"

export const DivisionDebt = (title:string, subTitle:string, members:any, debtUsers:any, handlerDebt:any) => {
    return (
    <Box>
        <Card sx={{mt : 3, boxShadow: 5}}>
          <CardContent>
              <Typography variant="h4"> {title} </Typography>
                {members.map( (aMember:any, index:any) => { return <Box key={index}>
                <Box display="flex" alignItems="center" sx={{mb: 2}}> 
                    <Box flex={1}>
                        <Typography variant="h5" gutterBottom> {aMember.username} </Typography>
                        <Typography variant="h6" gutterBottom> {aMember.email },  </Typography>
                    </Box>
                    <Box flex={1}>
                        <TextField
                          label={subTitle}
                          fullWidth
                          required
                          value={debtUsers[aMember.user_id] || 0}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={ (e) => { handlerDebt(aMember.user_id, Number(e.target.value))}}
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