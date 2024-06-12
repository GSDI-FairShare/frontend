import { useState } from "react";
import { getInfoAboutAGroupAnHisMembers } from "../services/groups";

export const UseMembers = (setError:any) => {
    const [members, setMembers] = useState([]);
    
    const getInfoAboutAGroup = async (groupId:string) => {
        const resultInfoGroup = await getInfoAboutAGroupAnHisMembers(Number(groupId), setError)
        console.log("resultInfoGroup 🤯: ", resultInfoGroup);
        return resultInfoGroup;
    } 
    
    return {members, setMembers, getInfoAboutAGroup}
}