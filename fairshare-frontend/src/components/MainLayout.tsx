import { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, CssBaseline } from '@mui/material';
import { CreateExpense } from './CreateExpense';
import { ViewExpenses } from './ViewExpenses';

const drawerWidth = 240;

export const MainLayout = ({ screen, toggleScreen, addExpense, expenses }) => {
  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem>
          <ListItemText primary="Gastos Personales" />
        </ListItem>
        <List component="div" disablePadding style={{ display: 'block' }}>
          <ListItem button onClick={() => toggleScreen('createExpense')} style={{ paddingLeft: '32px' }}>
            {/* Añadimos un margen izquierdo */}
            <ListItemText primary="Crear un gasto personal" />
          </ListItem>
          <ListItem button onClick={() => toggleScreen('viewExpenses')} style={{ paddingLeft: '32px' }}>
            {/* Añadimos un margen izquierdo */}
            <ListItemText primary="Ver gastos existentes" />
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
      <main style={{ flexGrow: 1, padding: '3rem', marginLeft: `${drawerWidth}px`, marginTop: '3rem' }}> {/* Added marginTop */}
        <div style={{ maxWidth: '400px', width: '100%' }}>
          {/* Limitamos el ancho del contenido */}
          {screen === 'createExpense' && <CreateExpense addExpense={addExpense} toggleScreen={toggleScreen} />}
          {screen === 'viewExpenses' && <ViewExpenses expenses={expenses} toggleScreen={toggleScreen} />}
        </div>
      </main>
    </div>
  );
};