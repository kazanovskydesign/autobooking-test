import http from "./lib";

export const parseLink = async () => {
  const response = await http("/search/parse_link");
  const { data } = await response.json()
  return data;
};
