import { Action, SET_AGE } from "./actions";

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case SET_AGE: {
      const age = action.payload.age;
      return { ...state, age };
    }
    default: {
      return state;
    }
  }
};

export type State = {
  age?: number;
};
export const initialState: State = {};
