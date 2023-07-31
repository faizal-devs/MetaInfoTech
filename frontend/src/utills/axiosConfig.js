export const base_url= "http://localhost:5000/api/";
const getTokenFromLocalStorage = localStorage.getItem("token")
  ? (localStorage.getItem("token"))
  : null;


  
export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage : ""
    }`,
    Accept: "application/json",
  },
};
