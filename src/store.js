import { createStore } from "redux";

const initialState = {
  balace: 0,
  loan: 0,
  loanPurpose: "",
};

function reducer(state = initialState, action) {
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

const store = createStore(reducer);
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
