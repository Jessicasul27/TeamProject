import { getRequestEvent } from "$app/server";
import { betterAuth } from "better-auth";
import { sveltekitCookies } from "better-auth/svelte-kit";
import Database from "better-sqlite3";

export const auth = betterAuth({
  database: new Database("app.db"),
  secret: "p83i04MzbSw1yBI8CRriQlHW4k3AtNPn",
  baseURL: "http://localhost:5173",

  emailAndPassword: {
    enabled: true,
  },

  advanced: {
    database: {
      generateId: "uuid",
    },
  },

  user: {
    modelName: "users",
    additionalFields: {
      firstName: {
        type: "string",
        required: true,
      },
      lastName: {
        type: "string",
        required: true,
      },
    },
  },

  session: {
    modelName: "sessions",
  },

  account: {
    modelName: "accounts",
  },

  verification: {
    modelName: "verifications",
  },

  plugins: [sveltekitCookies(getRequestEvent)],
});

export type BetterAuthSession = typeof auth.$Infer.Session;
export type BetterAuthUser = BetterAuthSession["user"];
export type BetterAuthSessionData = BetterAuthSession["session"];
