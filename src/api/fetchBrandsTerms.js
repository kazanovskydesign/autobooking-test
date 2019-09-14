import http from "./lib";

export const fetchBrandsTerms = async () => {
  const response = await http("/search/brands_terms");
  const { data } = await response.json()
  return data;
};
