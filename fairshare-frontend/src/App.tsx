import { useState } from 'react';
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ForgotPassword } from "./components/ForgotPassword";
import { MainLayout } from "./components/MainLayout";

const App = () => {
    const [screen, setScreen] = useState('login');
    const [expenses, setExpenses] = useState([]);

    const toggleScreen = (screenName) => {
        setScreen(screenName);
    };

    const addExpense = (expense) => {
        setExpenses([...expenses, expense]);
    };

    return (
        <main>
            {screen === 'login' && <Login toggleScreen={toggleScreen} />}
            {screen === 'register' && <Register toggleScreen={toggleScreen} />}
            {screen === 'forgotPassword' && <ForgotPassword toggleScreen={toggleScreen} />}
            {screen !== 'login' && screen !== 'register' && screen !== 'forgotPassword' &&
                <MainLayout screen={screen} toggleScreen={toggleScreen} addExpense={addExpense} expenses={expenses} />
            }
        </main>
    );
};

export default App;