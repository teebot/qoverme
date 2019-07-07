import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable("quotes", table => {
    table.increments();
    table.string("plan");
    table.string("carBrand");
    table.float("carPurchasePrice");
    table.integer("age");
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable("quotes");
}
