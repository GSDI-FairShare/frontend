import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ForgotPassword } from "./components/ForgotPassword";
import { MainLayout } from "./components/MainLayout";
import { CreateExpense } from './components/CreateExpense';
import { ViewExpenses } from './components/ViewExpenses';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const toggleScreen = (screenName) => {
    navigate(screenName);
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login toggleScreen={toggleScreen} />} />
      <Route path="/register" element={<Register toggleScreen={toggleScreen} />} />
      <Route path="/forgotPassword" element={<ForgotPassword toggleScreen={toggleScreen} />} />
      <Route path="/menu" element={<MainLayout toggleScreen={toggleScreen} addExpense={addExpense} expenses={expenses} screen="menu" />} />
      <Route path="/createExpense" element={<MainLayout toggleScreen={toggleScreen} addExpense={addExpense} expenses={expenses} screen="createExpense" />} />
      <Route path="/viewExpenses" element={<MainLayout toggleScreen={toggleScreen} addExpense={addExpense} expenses={expenses} screen="viewExpenses" />} />
    </Routes>
  );
};

export default App;
