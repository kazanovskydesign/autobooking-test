import http from "./lib";

export const fetchTerms = async () => {
  const response = await http("/search/terms");
  const { data } = await response.json()
  return data;
};
