import { seed } from "$lib/server/db/seeder";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
  await seed();

  return json({ ok: true });
};
