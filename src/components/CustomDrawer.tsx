import { Toolbar, List, ListItem, ListItemText } from "@mui/material"

export const CustomDrawer = (toggleScreen:any) => {
    return (    <div>
        <Toolbar/>
        <List>
          <ListItem>
            <ListItemText primary="Gastos Personales" />
          </ListItem>
          <List component="div" disablePadding style={{ display: 'block' }}>
            <ListItem button onClick={() => toggleScreen('createExpense')} style={{ paddingLeft: '32px' } }>
              <ListItemText primary="Crear un gasto" />
            </ListItem>
            <ListItem button onClick={() => toggleScreen('viewExpenses')} style={{ paddingLeft: '32px' }}>
              <ListItemText primary="Visualizar gastos existentes" />
            </ListItem>
          </List>
          <ListItem>
            <ListItemText primary="Deudas grupales" />
          </ListItem>
          <List component="div" disablePadding style={{ display: 'block' }}>
            <ListItem button onClick={() => toggleScreen('createGroup')} style={{ paddingLeft: '32px' }}>
              <ListItemText primary="Crear un grupo" />
            </ListItem>
            <ListItem button onClick={() => toggleScreen('createDebt')} style={{ paddingLeft: '32px' }}>
              <ListItemText primary="Crear una deuda" />
            </ListItem>
            <ListItem button onClick={() => toggleScreen('viewDebts')} style={{ paddingLeft: '32px' }}>
              <ListItemText primary="Visualizar las deudas" />
            </ListItem>
            <ListItem button onClick={() => toggleScreen('viewGroups')} style={{ paddingLeft: '32px' }}>
              <ListItemText primary="Ver Grupos" />
            </ListItem>
          </List>
        </List>
      </div>)
}