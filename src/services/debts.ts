import axios from "axios";
import { getGroups, getInfoGroup } from "./groups";
import { getUserData } from "./users";
import { handleError } from "../logic/handleError";
import { getToken } from "../logic/getToken";

export const createDebt = async (selectedGroup:string, debtName:string, amount:number, date:string, setError) => {
    const {isValid, token} = getToken();
    if (!isValid){
        return
    }
    try{
        const response = await axios.post(`http://localhost:5000/groups/${selectedGroup}/expenses`, {
            amount: amount,
            description: debtName,
            date: date
          }, {
            headers: {
              'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
          });
        return response;
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

