export const SET_AGE = "SET_AGE";
export const SET_CAR_BRAND = "SET_CAR_BRAND";
export const SET_CAR_PURCHASE_PRICE = "SET_CAR_PURCHASE_PRICE";

type SetAgeAction = {
  type: typeof SET_AGE;
  payload: { age?: number };
};

type SetCarBrandAction = {
  type: typeof SET_CAR_BRAND;
  payload: { carBrand: string };
};

type SetCarPurchasePriceAction = {
  type: typeof SET_CAR_PURCHASE_PRICE;
  payload: { carPurchasePrice?: number };
};

export function setAge(age?: number): Action {
  return {
    type: SET_AGE,
    payload: { age }
  };
}

export function setCarBrand(carBrand: string): Action {
  return {
    type: SET_CAR_BRAND,
    payload: { carBrand }
  };
}

export function setCarPurchasePrice(carPurchasePrice?: number): Action {
  return {
    type: SET_CAR_PURCHASE_PRICE,
    payload: { carPurchasePrice }
  };
}

export type Action =
  | SetAgeAction
  | SetCarBrandAction
  | SetCarPurchasePriceAction;
