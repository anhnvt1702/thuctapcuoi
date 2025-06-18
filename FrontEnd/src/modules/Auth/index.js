class Auth {
  constructor() {
    if (localStorage.getItem("current_user") !== 'undefined') {
      try {
        this.user = JSON.parse(localStorage.getItem("current_user")) || null;
      } catch (error) {
        console.error(error);
        this.user = null;
      }
    }
    else
      this.user = null
  }
  getToken() {
    return this.user?.token;
  }
  getUserId() {
    return this.user?.user_Id;
  }

  getUserDetails() {
    return this.user;
  }

  setCurrentUser(user) {
    this.user = user;
    localStorage.setItem("current_user", JSON.stringify(user));
  }
  
  logout() {
    this.user = null;
    localStorage.removeItem("current_user");
  }

  IsValidated(){
    
    if(this.user && Object.keys(this.user) !== 0){
      return true;
    }
    else {
      return false;
    }
  }
}
export default new Auth();
