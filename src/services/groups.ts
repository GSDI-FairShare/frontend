import axios from "axios";
import { getUserData } from "./users";
import { getToken } from "../logic/getToken";
import { handleError } from "../logic/handleError";

export const getInfoGroup = async(groupId:number, setError) => {
    const {isValid, token} = getToken();
    if (!isValid){
        return
    }
    try{
      const response = await axios.get(`http://localhost:5000/groups/${groupId}`, {
        headers: {
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        }
      });
      console.log("response.data: ", response.data);
      return response.data
    } catch(error){
      handleError("Al Obtener la Informacion del grupo ", error, setError)
    }
}


export const createGroup = async (groupName:string, groupDescription:string,  emails, setError) => {
    const {isValid, token} = getToken();
    if (!isValid){
        return
    }
    try{
      const groupResponse = await axios.post('http://localhost:5000/groups', {
      name: groupName,
      description: groupDescription
      }, { headers: {
            'Authorization': `Bearer ${token}`  
        }
      });
      const groupId = groupResponse.data.id; 
      await emails.map(async email => {
        const userResponse = await axios.get(`http://localhost:5000/users/email/${email}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const userId = userResponse.data.id;
        return axios.post('http://localhost:5000/group_members', {
          user_id: userId,
          group_id: groupId
          }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    });
    setError(null); // Clear previous error messages
    return groupResponse;
    } catch( error) {
      handleError("Al Crear un grupo ", error, setError)
    }
}


export const getGroups = async (setError) => {
    const {isValid, token} = getToken();
    if (!isValid){
        return
    }
    try {
      const response = await axios.get('http://localhost:5000/groups', {
        headers: {
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        }
      });
      console.log("response.data: ", response.data);
      return response.data;
  } catch (error) {
    handleError("Al obtener los grupos", error, setError)
  }
}


export const getDataOfMyGroupsAndHisMembers = async (setError) => {
    const {isValid} = getToken();
    if (!isValid){
        return
    }
    try{
      const allMyGroups = await getGroups(setError);
      console.log("allMyGroups--  🎲 : ", allMyGroups);
      const dataTeams = await Promise.all(allMyGroups.map( async (aGroup) => {
          const members = await Promise.all(aGroup.members.map( async (aMember) => {
            const userData = await getUserData(aMember.user_id, setError);
            return {name: userData.username, email: userData.email};
          }));
          return {id: aGroup.id, description: aGroup.description, name: aGroup.name, members};
        }
       ))
       return dataTeams;
    } catch (error){
      handleError("Al obtener Los datos de los grupos con todos sus miembros", error, setError)
    }
}


