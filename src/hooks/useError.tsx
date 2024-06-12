import { useState } from "react";

type ErrorState = {
    activate: boolean;
    message: string;
};

export const UseError = () => {
    const [error, setError] = useState<ErrorState>({ activate: false, message: "" });
    return { error, setError };
};