import API from "../myAxios/API";
import Auth from "../modules/Auth";

export const login = async (username, password) => {
  const params = {
    p_user_name: username,
    p_password: password
  };

  return await API({
    method: "GET",
    url: "/user/login",
    params: params
  }).then(res => {
    Auth.setCurrentUser(res.data);
    return res;
  });
};

export const register = async (username,full_Name, email, password,phone) => {
  return await API({
    method: "POST",
    url: "/user/signin",
    data: {
      username,
      full_Name,
      email,
      password,
      phone
    }
  }).then(res => {
    // Auth.setUserToken(res.data.user_token);
    console.log(res);
    return res;
  });
};
