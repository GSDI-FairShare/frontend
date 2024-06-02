import { useState } from "react";

export const UseError = () => {
    const [error, setError] = useState("");
    return {error, setError}
}