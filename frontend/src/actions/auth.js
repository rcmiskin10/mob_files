export const loadUser = () => {
  return (dispatch, getState) => {
    dispatch({type: "USER_LOADING"});

    const token = getState().auth.token;

    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      let body = JSON.stringify({token:token})
      return fetch("/auth-jwt-verify/", {headers, body, method: "POST"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          return res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: 'USER_LOADED', data: res.data });
          return res.data;
        } else if (res.status >= 400 && res.status < 500) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          return res.data;
        }
      })
    }
    else {
      dispatch({type: "AUTHENTICATION_ERROR"});
    }
    
  }
}

export const login = (email, password) => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({email:email, password:password});

    return fetch("/api/auth/token/", {headers, body, method: "POST"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          return res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          console.log(res.data)
          dispatch({type: 'LOGIN_SUCCESSFUL', data: res.data });
          
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          return res.data;
        } else {
          dispatch({type: "LOGIN_FAILED", data: res.data});
          return res.data;
        }
      })
  }
}

export const signup = (email, firstName, lastName, password, password2, userType) => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({email:email, first_name:firstName, last_name:lastName, password:password, password2:password2, user_type:userType});
    
    return fetch("/api/accounts/register/user/", {headers, body, method: "POST"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          return res;
        }
      })
      .then(res => {
        if (res.status === 201 || res.status === 200) {
          dispatch({type: 'SIGNUP_SUCCESSFUL', data: res.data });
          dispatch(login(email, password));
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          return res.data
        } else {
          dispatch({type: "SIGNUP_FAILED", data: res.data});
          return res.data;
        }
      })
  }
}

export const createBusinessProfile = (businessName, businessPhone, businessUrl) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    let headers = {"Content-Type": "application/json", "Authorization": `JWT ${token}`};

    let body = JSON.stringify({business_name:businessName, business_phone:businessPhone, business_url:businessUrl});
    return fetch("/api/accounts/business-profile/create/", {headers, body, method: "POST"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          return res;
        }
      })
      .then(res => {
        if (res.status === 201 || res.status === 200) {
          dispatch({type: 'CREATE_BUSINESS_PROFILE_SUCCESSFUL', data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: "CREATE_BUSINESS_PROFILE_ERROR", data: res.data});
          return res.data
        } else {
          dispatch({type: "CREATE_BUSINESS_PROFILE_FAILED", data: res.data});
          return res.data;
        }
      })
  }
}

export const checkEventProfileStripeAccountVerificationNeeded = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    let headers = {"Content-Type": "application/json", "Authorization": `JWT ${token}`};

    let body = JSON.stringify({});
    return fetch("/api/accounts/event-profile/get-stripe-account-verification-needed/", {headers, method: "GET"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          return res;
        }
      })
      .then(res => {
        if (res.status === 201 || res.status === 200) {
          dispatch({type: 'CHECK_EVENT_PROFILE_STRIPE_ACCOUNT_VERIFICATION_NEEDED_SUCCESSFUL', data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: "CHECK_EVENT_PROFILE_STRIPE_ACCOUNT_VERIFICATION_NEEDED_ERROR", data: res.data});
          return res.data
        } else {
          dispatch({type: "CHECK_EVENT_PROFILE_STRIPE_ACCOUNT_VERIFICATION_NEEDED_FAILED", data: res.data});
          return res.data;
        }
      })
  }
}

export const logout = () => {
  return (dispatch, getState) => {
    dispatch({type: "LOGOUT_SUCCESSFUL"});
  }
}

export const toggleDrawer = () => {
  return (dispatch, getState) => {
    dispatch({type: "TOGGLE_DRAWER", data: getState().auth.isDrawerOpen});
  }
}
