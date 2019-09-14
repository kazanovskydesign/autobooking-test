const http = async endpoint => {
  const BESE_URL = "https://beta.autobooking.com/api/test/v1";
  return fetch(`${BESE_URL}${endpoint}`);
};

export default http;
