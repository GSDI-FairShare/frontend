import { useState } from "react";

export const UseGroupsBasic = () => {
  const [groups, setGroups] = useState<any[]>([]); // Añadido tipo
  return { groups, setGroups };
};