const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isRegistered: false,
  isLoading: true,
  user: null,
  userType: null,
  errors: {},
  isBusinessProfileCreated:false,
  isDrawerOpen: true,
  eventProfileStripeAccountVerificationNeeded: null,
  accountID: null
};


export default function auth(state=initialState, action) {

  switch (action.type) {

    case 'USER_LOADING':
      return {...state, isLoading: true};

    case 'USER_LOADED':
      return {...state, isAuthenticated: true, isLoading: false, user: action.data};

    case 'LOGIN_SUCCESSFUL':
      localStorage.setItem("token", action.data.token);
      return {...state, ...action.data, isAuthenticated: true, isLoading: false, user:action.data, errors: null};

    case 'SIGNUP_SUCCESSFUL':
      return {...state, ...action.data, isRegistered: true, isLoading: false, errors: null};
    case 'SIGNUP_FAILED':
      return {...state, errors: action.data, isRegistered: false, isLoading: false};

    case 'CREATE_BUSINESS_PROFILE_SUCCESSFUL':
      return {...state, ...action.data, isBusinessProfileCreated:true, isLoading: false, errors: null};

    case 'CREATE_BUSINESS_PROFILE_FAILED':
      return {...state, errors: action.data, isBusinessProfileCreated: false, isLoading: false};

    case 'CHECK_EVENT_PROFILE_STRIPE_ACCOUNT_VERIFICATION_NEEDED_SUCCESSFUL':
      return {
        ...state, 
        ...action.data, 
        eventProfileStripeAccountVerificationNeeded:action.data.verification_data_needed, 
        accountID:action.data.account_id,
        isLoading: false, 
        errors: null
      };

    case 'CHECK_EVENT_PROFILE_STRIPE_ACCOUNT_VERIFICATION_NEEDED_FAILED':
      return {...state, errors: action.data,  isLoading: false};

    case 'TOGGLE_DRAWER':
      return {...state, isDrawerOpen: !action.data};
    case 'AUTHENTICATION_ERROR':
    case 'LOGIN_FAILED':
    
    case 'LOGOUT_SUCCESSFUL':
      localStorage.removeItem("token");
      return {...state, errors: action.data, token: null, user: null,
        isAuthenticated: false, isLoading: false};

    default:
      return state;
  }
}