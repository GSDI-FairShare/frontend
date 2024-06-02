import axios from "axios";
import { getGroups, getInfoGroup } from "./groups";
import { getUserData } from "./users";
import { handleError } from "../logic/handleError";
import { getToken } from "../logic/getToken";
import { EQUITABLE, PERCENTAGES, SPECIFIC_AMOUNTS } from "../constants/constants";

export const createEquitableDebt = async (token:string, selectedGroupId:string, amount:number, debtName:string, date:string) => {
    const response = await axios.post(`http://localhost:5000/groups/${selectedGroupId}/expenses`, {
      amount: amount,
      description: debtName,
      date: date
    }, {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    });
    return response;
}

export const createPercentagesDebt = async (token:string, selectedGroupId:string, amount: number, percentageUsers, debtName:string, date:string) => {
    const response = await axios.post(`http://localhost:5000/groups/${selectedGroupId}/expenses`, {
      amount: amount,
      description: debtName,
      date: date,
      splits: percentageUsers,
    }, {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    });
    return response;
}

export const createAmountDebt = async (token:string, selectedGroupId:string, amount: number, amountsToSend, debtName:string, date:string) => {
  const response = await axios.post(`http://localhost:5000/groups/${selectedGroupId}/expenses`, {
    amount: amount,
    description: debtName,
    date: date,
    splits: amountsToSend,
  }, {
    headers: {
      'Authorization': `Bearer ${token}` // Include the token in the Authorization header
    }
  });
  return response;
}

export const createDebt = async (selectTypeSplit:string, percentageUsers, amountsToSend,  selectedGroupId:string, debtName:string, amount:number, date:string, setError) => {
    const {isValid, token} = getToken();
    if (!isValid){
        return
    }
    try{
      if(selectTypeSplit == EQUITABLE ){
        await createEquitableDebt(token, selectedGroupId, amount, debtName, date);
      } else if (selectTypeSplit == PERCENTAGES ){
        await createPercentagesDebt(token, selectedGroupId, amount, percentageUsers, debtName, date)
      } else if (selectTypeSplit == SPECIFIC_AMOUNTS ){
        await createAmountDebt(token, selectedGroupId, amount, amountsToSend, debtName, date)
      }
    } catch(error){
        handleError("Al crear una deuda ", error, setError);
    }
}

export const getAllDebtsFromMyGroups = async (setError) => {
    const {isValid, token} = getToken();
    if (!isValid){
        return
    }
    try{
      const groupIds = (await getGroups(setError)).map( (aGroup) => { return aGroup.id })
      const allDataAboutDebts = await Promise.all(groupIds.map( async (aGroupId) => {
        const response = await axios.get(`http://localhost:5000/groups/${aGroupId}/expenses`, {
          headers: {
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          }
        });
        return response;
      }))
      const filterDataDebts = allDataAboutDebts.filter( (aGroup) => { return (aGroup.data.length >= 1) });
      console.log("allDebts", filterDataDebts);
      
      // Agregamos el info del grupo (nombre y descripcion) y la info de cada usuario (nombre y email)
      await Promise.all(filterDataDebts.map(async (aGroup) => {
        const infoGroup = await getInfoGroup(aGroup.data[0].group_id, setError);
        await Promise.all(aGroup.data.map( async (aDebt) => { 
          aDebt.name = infoGroup.name;
          aDebt.groupDescription = infoGroup.description;
          await Promise.all(aDebt.splits.map( async (aUser) => {
            const userDataInfo = await getUserData(aUser.user_id, setError);
            aUser.name= userDataInfo.username;
            aUser.email= userDataInfo.email;
          }))
        })) 
      }));
      
      return filterDataDebts;
    } catch(error){
        handleError("Al obtener todas las deudas de mis grupos ", error, setError);
    }
}

