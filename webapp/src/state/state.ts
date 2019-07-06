import {
  Action,
  SET_AGE,
  SET_CAR_BRAND,
  SET_CAR_PURCHASE_PRICE
} from "./actions";

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case SET_AGE: {
      const { age } = action.payload;
      return { ...state, age };
    }
    case SET_CAR_BRAND: {
      const { carBrand } = action.payload;
      return { ...state, carBrand };
    }
    case SET_CAR_PURCHASE_PRICE: {
      const { carPurchasePrice } = action.payload;
      return { ...state, carPurchasePrice };
    }
    default: {
      console.warn("Invalid Action");
      return state;
    }
  }
};

export type State = {
  age?: number;
  carBrand?: string;
  carPurchasePrice?: number;
};
export const initialState: State = {};
