import { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, CssBaseline } from '@mui/material';
import { CreateExpense } from './CreateExpense';
import { ViewExpenses } from './ViewExpenses';
import { CreateGroup } from './CreateGroup';
import { ViewGroups } from './ViewGroups';
import { CreateDebt } from './CreateDebt';
import { ViewDebts } from './ViewDebts';

const drawerWidth = 240;

export const MainLayout = ({ screen, toggleScreen, addExpense, expenses }) => {
  const [groups, setGroups] = useState([]);
  const [debts, setDebts] = useState([]);

  const addGroup = (group) => {
    setGroups([...groups, group]);
  };

  const addDebt = (debt) => {
    setDebts([...debts, debt]);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem>
          <ListItemText primary="Gastos Personales" />
        </ListItem>
        <List component="div" disablePadding style={{ display: 'block' }}>
          <ListItem button onClick={() => toggleScreen('createExpense')} style={{ paddingLeft: '32px' }}>
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
    </div>
  );

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" style={{ zIndex: 1400 }}>
        <Toolbar>
          <Typography variant="h6" noWrap style={{ margin: 'auto' }}>
            FairShare
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" style={{ width: drawerWidth, flexShrink: 0 }}>
        {drawer}
      </Drawer>
      <main style={{ flexGrow: 1, padding: '3rem', marginLeft: `${drawerWidth}px`, marginTop: '3rem' }}>
        <div style={{ maxWidth: '400px', width: '100%' }}>
          {screen === 'createExpense' && <CreateExpense addExpense={addExpense} toggleScreen={toggleScreen} />}
          {screen === 'viewExpenses' && <ViewExpenses expenses={expenses} toggleScreen={toggleScreen} />}
          {screen === 'createGroup' && <CreateGroup addGroup={addGroup} toggleScreen={toggleScreen} />}
          {screen === 'viewGroups' && <ViewGroups groups={groups} toggleScreen={toggleScreen} />}
          {screen === 'createDebt' && <CreateDebt toggleScreen={toggleScreen} groups={groups} addDebt={addDebt} />}
          {screen === 'viewDebts' && <ViewDebts debts={debts} toggleScreen={toggleScreen} />}
        </div>
      </main>
    </div>
  );
};