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
        loan: action.payload,
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
