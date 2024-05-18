import { Button, Stack } from "@mui/material";

export const Menu = ({ toggleScreen }: { toggleScreen: (screen: string) => void }) => {
    return (
        <div className='menu'>
            <h1 className="menu__title">Menú Principal</h1>
            <Stack spacing={3}>
                <Button onClick={() => toggleScreen('createExpense')} size='large' variant="contained">Crear un gasto personal</Button>
                <Button onClick={() => toggleScreen('viewExpenses')} size='large' variant="contained">Ver gastos existentes</Button>
            </Stack>
        </div>
    );
};
