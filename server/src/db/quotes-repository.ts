import { db } from "./../db/db";
import { Quote } from "../types/quote.type";

export const quotesRepository = {
  all: () => db("quotes"),
  save: async (quote: Quote) => {
    const { age, carBrand, carPurchasePrice, plan } = quote;
    const [id] = await db("quotes")
      .insert({
        age,
        carBrand,
        carPurchasePrice,
        plan,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning("id");
    return id;
  }
};
