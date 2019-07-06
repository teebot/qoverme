export const SET_AGE = "SET_AGE";
export const SET_CAR_BRAND = "SET_CAR_BRAND";

type SetAgeAction = {
  type: typeof SET_AGE;
  payload: { age?: number };
};

type SetCarBrandAction = {
  type: typeof SET_CAR_BRAND;
  payload: { carBrand: string };
};

export function setAge(age?: number): Action {
  console.log("setting age", age);
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

export type Action = SetAgeAction | SetCarBrandAction;
