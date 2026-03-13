import type { auth } from "$lib/server/auth";

type BetterAuthSession = typeof auth.$Infer.Session;
type BetterAuthUser = BetterAuthSession["user"];
type BetterAuthSessionData = BetterAuthSession["session"];

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}

    interface Locals {
      user: BetterAuthUser | null;
      session: BetterAuthSessionData | null;
    }

    // interface PageData {}

    // interface PageState {}

    // interface Platform {}
  }
}

export {};
