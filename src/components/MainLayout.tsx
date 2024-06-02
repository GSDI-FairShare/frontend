import { Drawer, AppBar, Toolbar, Typography} from '@mui/material';
import { CreateExpense } from './CreateExpense';
import { ViewExpenses } from './ViewExpenses';
import { CreateGroup } from './CreateGroup';
import { ViewGroups } from './ViewGroups';
import { CreateDebt } from './CreateDebt';
import { ViewDebts } from './ViewDebts';
import { PayDebt } from './PayDebt';
import { CustomDrawer } from './CustomDrawer';
const drawerWidth = 240;

export const MainLayout = ({ screen, toggleScreen }) => {
  return (
    <div>
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
        <div style={{ width: '100%' }}>
          {screen === 'createExpense' && <CreateExpense toggleScreen={toggleScreen} />}
          {screen === 'viewExpenses' && <ViewExpenses toggleScreen={toggleScreen} />}
          {screen === 'createGroup' && <CreateGroup  toggleScreen={toggleScreen} />}
          {screen === 'viewGroups' && <ViewGroups toggleScreen={toggleScreen} />}
          {screen === 'createDebt' && <CreateDebt toggleScreen={toggleScreen}  />}
          {screen === 'viewDebts' && <ViewDebts toggleScreen={toggleScreen} />}
          {screen === 'payDebt' && <PayDebt toggleScreen={toggleScreen} />}
        </div>
      </main>
    </div>
  );
};
