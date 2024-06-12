import { useEffect, useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import { getGroups } from '../services/groups';
import { createDebt } from '../services/debts';
import { getCategories } from "../services/expenses";
import { UseCreateDebt } from '../hooks/useCreateDebt';
import { UseGroupsBasic } from '../hooks/useGroupsBasic';
import { UseError } from '../hooks/useError';
import { PERCENTAGES, SPECIFIC_AMOUNTS, typesDebtSplit } from '../constants/constants';
import { UseMembers } from '../hooks/useMembers';
import { UseDebtPercentages } from '../hooks/useDebtPercentages';
import { UseDebtAmount } from '../hooks/useDebtAmount';
import { DivisionDebt } from './DivisionDebt';

export const CreateDebt = ({ toggleScreen }: { toggleScreen: any }) => {
  const {error, setError} = UseError();
  const {debtName, setDebtName, selectedGroupId, setSelectedGroupId,
        amount, setAmount, date, setDate, resetFields, isValidInput,
        selectTypeSplit, setSelectTypeSplit} = UseCreateDebt(setError);
  const {members, setMembers, getInfoAboutAGroup} = UseMembers(setError);
  const {groups, setGroups} = UseGroupsBasic();
  const {percentageUsers, handlerPercentages, initializeUserPercentages, areValidPercentages, getPercentagesToSend} = UseDebtPercentages(setError);
  const {debtAmountUsers, initializeUserAmounts, handlerAmounts, areValidAmounts, getAmountToSend } = UseDebtAmount(setError);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    getGroups(setError).then((groupsResult) => {
      console.log("groupsResult", groupsResult);
      setGroups(groupsResult);
    });

    getCategories(setError).then((categoriesResult) => {
      console.log("categoriesResult", categoriesResult);
      setCategories(categoriesResult);
    });
  }, []);

  useEffect(() => {
    if ((selectTypeSplit === PERCENTAGES || selectTypeSplit === SPECIFIC_AMOUNTS) && selectedGroupId !== '') {
      getInfoAboutAGroup(selectedGroupId).then((resultInfoGroup) => {
        setMembers(resultInfoGroup.members);
        if (selectTypeSplit === PERCENTAGES) {
          initializeUserPercentages(resultInfoGroup);
        } else {
          initializeUserAmounts(resultInfoGroup);
        }
      });
    }
  }, [selectTypeSplit, selectedGroupId]);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!isValidInput() || (selectTypeSplit === PERCENTAGES && !areValidPercentages()) || (selectTypeSplit === SPECIFIC_AMOUNTS && !areValidAmounts(amount))) {
      return;
    }
    let percentagesToSend = {};
    let amountsToSend = {};
    if (selectTypeSplit === PERCENTAGES) {
      percentagesToSend = getPercentagesToSend();
    } else if (selectTypeSplit === SPECIFIC_AMOUNTS) {
      amountsToSend = getAmountToSend(amount);
    }
    await createDebt(selectTypeSplit, percentagesToSend, amountsToSend, selectedGroupId, debtName, amount, date, selectedCategory, setError);
    resetFields();
    toggleScreen('viewDebts');
  };

  const handleCategoryChange = (e:any) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <h1>Crear Deuda</h1>
      <form style={{ marginTop: '0rem' }} onSubmit={handleSubmit}>
        <TextField
          label="Nombre de la Deuda"
          value={debtName}
          onChange={(e) => setDebtName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Seleccionar Grupo"
          select
          value={selectedGroupId}
          onChange={(e) => setSelectedGroupId(e.target.value)}
          fullWidth
          required
          margin="normal"
        >
          {groups.map((group:any, index) => (
            <MenuItem key={index} value={group.id}>
              {group.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Monto"
          value={amount}
          onChange={(e:any) => setAmount(e.target.value)}
          fullWidth
          required
          margin="normal"
          type="number"
        />
        <TextField
          label="Fecha"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          required
          margin="normal"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Seleccionar Categoría"
          select
          value={selectedCategory}
          onChange={handleCategoryChange}
          fullWidth
          required
          margin="normal"
        >
          {categories.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Seleccionar Division de deuda"
          select
          value={selectTypeSplit || ""}
          onChange={(e) => setSelectTypeSplit(e.target.value)}
          fullWidth
          required
          margin="normal"
        >
          {typesDebtSplit.map((typeSplit, index) => (
            <MenuItem key={index} value={typeSplit}>
              {typeSplit}
            </MenuItem>
          ))}
        </TextField>
        {selectTypeSplit === PERCENTAGES && 
          DivisionDebt("Porcentaje", "Porcentaje (%)", members, percentageUsers, handlerPercentages)
        }
        {selectTypeSplit === SPECIFIC_AMOUNTS &&
          DivisionDebt("Montos Específicos", "Monto ($)", members, debtAmountUsers, handlerAmounts)
        }
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '1rem' }}
        >
          Crear Deuda
        </Button>
      </form>
    </div>
  );
};
