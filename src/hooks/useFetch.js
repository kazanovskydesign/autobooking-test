import { useState, useEffect } from "react";

export const useFetch = fetchFunction => {
  const [result, setTerms] = useState([]);
  useEffect(() => {
    const fetchRequest = async () => {
      const response = await fetchFunction();
      setTerms(response);
    };
    fetchRequest();
  }, []);
  return result;
};
