import axios from "axios";
import { getGroups, getInfoGroup } from "./groups";
import { getUserData } from "./users";
import { handleError } from "../logic/handleError";
import { getToken } from "../logic/getToken";
import { EQUITABLE, PERCENTAGES, SPECIFIC_AMOUNTS } from "../constants/constants";

export const createEquitableDebt = async (token:any, selectedGroupId:any, amount:any, debtName:any, date:any, category:any) => {
    const response = await axios.post(`http://localhost:5000/groups/${selectedGroupId}/expenses`, {
      amount: amount,
      description: debtName,
      date: date,
      category: category
    }, {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    });
    return response;
}

export const createPercentagesDebt = async (token:any, selectedGroupId:any, amount:any, percentageUsers:any, debtName:any, date:any, category:any) => {
    const response = await axios.post(`http://localhost:5000/groups/${selectedGroupId}/expenses`, {
      amount: amount,
      description: debtName,
      date: date,
      splits: percentageUsers,
      category: category
    }, {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    });
    return response;
}

export const createAmountDebt = async (token:any, selectedGroupId:any, amount:any, amountsToSend:any, debtName:any, date:any, category:any) => {
  const response = await axios.post(`http://localhost:5000/groups/${selectedGroupId}/expenses`, {
    amount: amount,
    description: debtName,
    date: date,
    splits: amountsToSend,
    category: category
  }, {
    headers: {
      'Authorization': `Bearer ${token}` // Include the token in the Authorization header
    }
  });
  return response;
}

export const createDebt = async (selectTypeSplit:any, percentageUsers:any, amountsToSend:any, selectedGroupId:any, debtName:any, amount:any, date:any, category:any, setError:any) => {
    const {isValid, token} = getToken();
    if (!isValid){
        return;
    }
    try {
      if (selectTypeSplit === EQUITABLE) {
        await createEquitableDebt(token, selectedGroupId, amount, debtName, date, category);
      } else if (selectTypeSplit === PERCENTAGES) {
        await createPercentagesDebt(token, selectedGroupId, amount, percentageUsers, debtName, date, category);
      } else if (selectTypeSplit === SPECIFIC_AMOUNTS) {
        await createAmountDebt(token, selectedGroupId, amount, amountsToSend, debtName, date, category);
      }
    } catch (error) {
        handleError("Al crear una deuda ", error, setError);
    }
}

export const getAllDebtsFromMyGroups = async (setError:any) => {
    const {isValid, token} = getToken();
    if (!isValid){
        return;
    }
    try {
      const groupIds = (await getGroups(setError)).map((aGroup:any) => aGroup.id);
      const allDataAboutDebts = await Promise.all(groupIds.map(async (aGroupId:any) => {
        const response = await axios.get(`http://localhost:5000/groups/${aGroupId}/expenses`, {
          headers: {
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          }
        });
        return response;
      }));
      const filterDataDebts = allDataAboutDebts.filter(aGroup => aGroup.data.length >= 1);
      console.log("allDebts", filterDataDebts);
      
      // Add group info (name and description) and each user's info (name and email)
      await Promise.all(filterDataDebts.map(async (aGroup) => {
        const infoGroup = await getInfoGroup(aGroup.data[0].group_id, setError);
        await Promise.all(aGroup.data.map(async (aDebt:any) => {
          aDebt.name = infoGroup.name;
          aDebt.groupDescription = infoGroup.description;
          await Promise.all(aDebt.splits.map(async (aUser:any) => {
            const userDataInfo = await getUserData(aUser.user_id, setError);
            aUser.name = userDataInfo.username;
            aUser.email = userDataInfo.email;
          }));
        }));
      }));
      
      return filterDataDebts;
    } catch (error) {
        handleError("Al obtener todas las deudas de mis grupos ", error, setError);
    }
}
