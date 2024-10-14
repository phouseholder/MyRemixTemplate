import database from '~/postgrest/database'

export async function get_all_customers() {
  const customers = await database.findAll("customer");
  return customers;
}