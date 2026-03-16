<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import type { User } from "$lib/server/db/entities/user";
  import {
    BookOpenCheck,
    CircleQuestionMark,
    CircleUser,
    House,
    LogIn,
    LogOut,
    Menu,
    UserPlus,
  } from "lucide-svelte";

  let { user }: { user: User | null } = $props();
</script>

<div class="justify-self-end">
  {#if user}
    <details class="dropdown dropdown-end relative">
      <summary class="btn btn-ghost btn-circle">
        <Menu class="h-5 w-5" />
      </summary>

      <div
        class="menu dropdown-content z-1 mt-2 w-48 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
        <a href={resolve("/user/profile")} class="btn btn-ghost">
          Profile <CircleUser />
        </a>

        {#if user.customer}
          <div class="divider my-0"></div>
          <a href={resolve("/customer/bookings")} class="btn btn-ghost">
            My Bookings <BookOpenCheck />
          </a>
        {/if}

        {#if user.landlord}
          <div class="divider my-0"></div>
          <a href={resolve("/landlord/properties")} class="btn btn-ghost">
            My Properties <House />
          </a>
        {/if}

        <div class="divider my-0"></div>
        <a href={resolve("/user/help")} class="btn btn-ghost">
          Help Center <CircleQuestionMark />
        </a>
        <form method="POST" action={resolve("/auth/logout")} class="contents">
          <button type="submit" class="btn btn-ghost">Logout<LogOut /></button>
        </form>
      </div>
    </details>
  {:else if !page.url.pathname.startsWith("/auth")}
    <details class="dropdown dropdown-end relative">
      <summary class="btn btn-ghost btn-circle">
        <Menu class="h-5 w-5" />
      </summary>

      <div
        class="menu dropdown-content z-1 mt-2 w-48 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
        <a href={resolve("/auth/login")} class="btn btn-ghost">
          Login <LogIn /></a
        >

        <a href={resolve("/auth/register")} class="btn btn-ghost">
          Register <UserPlus /></a
        >

        <div class="divider my-0"></div>

        <a href={resolve("/user/help")} class="btn btn-ghost">
          <CircleQuestionMark />
          Help Center
        </a>
      </div>
    </details>
  {/if}
</div>
