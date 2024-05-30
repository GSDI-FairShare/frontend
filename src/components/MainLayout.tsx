import { Drawer, AppBar, Toolbar, Typography, CssBaseline } from '@mui/material';
import { CreateExpense } from './CreateExpense';
import { ViewExpenses } from './ViewExpenses';
import { CreateGroup } from './CreateGroup';
import { ViewGroups } from './ViewGroups';
import { CreateDebt } from './CreateDebt';
import { ViewDebts } from './ViewDebts';
import { PayDebt } from './PayDebt';
import { UseGroupsLayout } from '../hooks/useGroupsLayout';
import { UseDebts } from '../hooks/useDebts';
import { CustomDrawer } from './CustomDrawer';
import { UseSelectDet } from '../hooks/useSelectDebt';

const drawerWidth = 240;

export const MainLayout = ({ screen, toggleScreen, addExpense, expenses }) => {
  const {groups, addGroup} = UseGroupsLayout();
  const {debts, addDebt} = UseDebts() 
  const {selectedDebt, setSelectedDebt} = UseSelectDet();

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
        {CustomDrawer(toggleScreen)}
      </Drawer>
      <main style={{ flexGrow: 1, padding: '3rem', marginLeft: `${drawerWidth}px`, marginTop: '3rem' }}>
        <div style={{ maxWidth: '400px', width: '100%' }}>
          {screen === 'createExpense' && <CreateExpense addExpense={addExpense} toggleScreen={toggleScreen} />}
          {screen === 'viewExpenses' && <ViewExpenses expenses={expenses} toggleScreen={toggleScreen} />}
          {screen === 'createGroup' && <CreateGroup addGroup={addGroup} toggleScreen={toggleScreen} />}
          {screen === 'viewGroups' && <ViewGroups groups={groups} toggleScreen={toggleScreen} />}
          {screen === 'createDebt' && <CreateDebt toggleScreen={toggleScreen} groups={groups} addDebt={addDebt} />}
          {screen === 'viewDebts' && <ViewDebts debts={debts} toggleScreen={toggleScreen} setSelectedDebt={setSelectedDebt} />}
          {screen === 'payDebt' && <PayDebt selectedDebt={selectedDebt} toggleScreen={toggleScreen} />}
        </div>
      </main>
    </div>
  );
};
