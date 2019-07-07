import { State } from "./state";
import { Plan } from "../types/plan.type";
import { Coverage } from "../types/coverage.type";
import config from "../plans-config.json";

type PlanConfig = {
  name: string;
  yearlyFeeCents: { [c: string]: number };
  addedFeePercents: { [c: string]: number };
  coverage: Coverage;
};
const plansConfig: PlanConfig[] = config;

export const calcPlans = (state: State): Plan[] => {
  const { quoteParams } = state;
  return plansConfig.map(plan => {
    const basePrice = plan.yearlyFeeCents[quoteParams.carBrand];
    const addedPrice =
      (quoteParams.carPurchasePrice *
        100 *
        plan.addedFeePercents[quoteParams.carBrand]) /
      100;
    const divider = state.invoiceFreq === "monthly" ? 12 : 1;
    return {
      price: +((basePrice + addedPrice) / 100 / divider).toFixed(2),
      name: plan.name,
      coverage: plan.coverage
    };
  });
};
