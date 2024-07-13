import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balace: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balace: state.balace + action.payload,
      };
    case "account/withdraw":
      return {
        ...state,
        balace: state.balace - action.payload,
      };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balace: state.balace + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balace: state.balace - state.loan,
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

// combine two reducer
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

/* 
store.dispatch({
  type: "account/deposit",
  payload: 500,
});

store.dispatch({
  type: "account/withdraw",
  payload: 200,
});

store.dispatch({
  type: "account/requestLoan",
  payload: {
    amount: 1000,
    purpose: "To by a car",
  },
});

store.dispatch({
  type: "account/payLoan",
});
console.log(store.getState());
 */

// TODO
function deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}

function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}

function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount: amount,
      purpose: purpose,
    },
  };
}

function payLoan() {
  return {
    type: "account/payLoan",
  };
}

// TODO
function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}

function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}

store.dispatch(deposit(500));
store.dispatch(withdraw(200));
store.dispatch(requestLoan(1000, "To buy a cheap car!"));
store.dispatch(payLoan());
console.log(store.getState().account);

store.dispatch(createCustomer("Hồ Hoài Kiệt", "191810309"));
store.dispatch(updateName("Hồ Hoài Kiệt 2024"));
console.log(store.getState().customer);
