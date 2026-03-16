import { building } from "$app/environment";
import { auth } from "$lib/server/auth";
import { dataSource } from "$lib/server/db";
import { seed } from "$lib/server/db/seeder";
import type { Handle, ServerInit } from "@sveltejs/kit";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { getMigrations } from "better-auth/db/migration";

export const init: ServerInit = async () => {
  if (dataSource.isInitialized) {
    return;
  }

  await dataSource.initialize();

  const queryRunner = dataSource.createQueryRunner();
  const authMigrated = await queryRunner.hasTable("accounts");
  if (!authMigrated) {
    const { runMigrations } = await getMigrations(auth.options);
    await runMigrations();
  }

  await seed();
};

export const handle: Handle = async ({ event, resolve }) => {
  // every time a user navigates to a route, we load their auth session
  // from cookies/headers
  const session = await auth.api.getSession({
    headers: event.request.headers,
  });

  // and then we load their session/user details into the locals
  // ...which we can then access in +page.server.ts files
  if (session) {
    event.locals.session = session.session;
    event.locals.user = session.user;
  } else {
    event.locals.session = null;
    event.locals.user = null;
  }

  return svelteKitHandler({ event, resolve, auth, building });
};
