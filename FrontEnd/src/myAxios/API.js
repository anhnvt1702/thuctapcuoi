import Auth from "../modules/Auth";
import axios from "axios";
const URL = "http://localhost:5001";

const API = (config) => {
  try {
    if (Auth.user) {
      const token = Auth.getToken();
      
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    //interceptors handle network error
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      function (error) {
        if (!error.response) {
          error.response = {
            data: "net work error",
            status: 500,
          };
        }
        if (error.response.status === 401) {
          Auth.logout();
          //jumpTo("/login");
          //throw error;
        }
        return Promise.reject(error);
      }
    );
    config.baseURL = URL;
    return axios(config);
  } catch (error) {
    console.error(error)
  }
 
};
export default API;
