import { Action, SET_QUOTE_PARAMS, SET_INVOICE_FREQ } from "./actions";
import { InvoiceFreq } from "../types/invoice-freq.type";

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case SET_QUOTE_PARAMS: {
      const { age, carBrand, carPurchasePrice } = action.payload;
      return { ...state, age, carBrand, carPurchasePrice };
    }
    case SET_INVOICE_FREQ: {
      const { invoiceFreq } = action.payload;
      return { ...state, invoiceFreq };
    }
    default: {
      console.warn("Invalid Action");
      return state;
    }
  }
};

export type State = {
  age?: number;
  carBrand: string;
  carPurchasePrice?: number;
  invoiceFreq: InvoiceFreq;
};
export const initialState: State = { invoiceFreq: "yearly", carBrand: "" };
