import { useState } from "react";

export const UseSelectDet = () => {
    const [selectedDebt, setSelectedDebt] = useState(null);
    return {selectedDebt, setSelectedDebt}
}