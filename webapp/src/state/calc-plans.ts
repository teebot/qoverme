import { State } from "./state";
import { Plan } from "../types/plan.type";

type PlanConfig = {
  name: string;
  yearlyFeeCents: { [c: string]: number };
  addedFeePercents: { [c: string]: number };
};
const plansConfig: PlanConfig[] = [
  {
    name: "Global",
    yearlyFeeCents: {
      audi: 25000,
      bmw: 15000,
      porsche: 50000
    },
    addedFeePercents: {
      audi: 0,
      bmw: 0,
      porsche: 0
    }
  },
  {
    name: "Universal",
    yearlyFeeCents: {
      audi: 25000,
      bmw: 15000,
      porsche: 50000
    },
    addedFeePercents: {
      audi: 0.3,
      bmw: 0.4,
      porsche: 0.7
    }
  }
];

export const calcPlans = (state: State): Plan[] => {
  return plansConfig.map(config => {
    if (!state.carBrand || !state.age || !state.carPurchasePrice) {
      console.warn("Invalid state");
      return { name: "", price: 0 };
    }
    const basePrice = config.yearlyFeeCents[state.carBrand];
    const addedPrice =
      (state.carPurchasePrice * 100 * config.addedFeePercents[state.carBrand]) /
      100;
    const divider = state.invoiceFreq === "monthly" ? 12 : 1;
    return {
      price: +((basePrice + addedPrice) / 100 / divider).toFixed(2),
      name: config.name
    };
  });
};
