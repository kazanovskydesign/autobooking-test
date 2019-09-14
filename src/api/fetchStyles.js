import http from "./lib";

export const fetchStyles = async () => {
  const response = await http("/search/styles");
  const { data } = await response.json()
  return data;
};
