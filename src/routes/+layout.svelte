<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import { page } from "$app/state";
  import { resolve } from "$app/paths";
  import { Toaster } from "svelte-sonner";

  let { children, data } = $props();
</script>

<svelte:head> <link rel="icon" href={favicon} > </svelte:head>

<Toaster position="bottom-right" />

{#if page.url.pathname !== "/"}
  <header>
    <nav
      class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light border-bottom box-shadow mb-3 bg-white">
      <div class="container">
        <a href={resolve("/")} class="navbar-brand">Staycraft</a>

        <button
          type="button"
          class="btn btn-accent navbar-toggler"
          aria-expanded="false"
          aria-label="open navbar">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          class="navbar-collapse d-sm-inline-flex justify-content-between collapse">
          <ul class="navbar-nav grow">
            <li class="nav-item">
              <a href={resolve("/")} class="nav-link text-dark">Home</a>
            </li>

            {#if data.user}
              <li class="nav-item dropdown nav-justify-content-end">
                <button
                  type="button"
                  class="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  Account
                </button>

                <div class="dropdown-menu">
                  {#if data.user.customer}
                    <a href={resolve("/user/profile")} class="dropdown-item">
                      My Profile
                    </a>
                    <a
                      href={resolve("/customer/bookings")}
                      class="dropdown-item">
                      My Bookings
                    </a>
                  <!-- <a href={resolve("/help")} class="dropdown-item">Help</a> -->
                  {/if}

                  {#if data.user.landlord}
                    <a
                      href={resolve("/landlord/properties")}
                      class="dropdown-item">
                      My Properties
                    </a>
                  {/if}

                  {#if data.user.admin}
                    <a
                      href={resolve("/admin/properties")}
                      class="dropdown-item">
                      Properties
                    </a>
                    <a href={resolve("/admin/customers")} class="dropdown-item">
                      Customers
                    </a>
                    <a href={resolve("/admin/landlords")} class="dropdown-item">
                      Landlords
                    </a>
                  {/if}

                  <div class="dropdown-divider"></div>

                  <a
                    data-sveltekit-reload
                    href={resolve("/auth/logout")}
                    class="dropdown-item">
                    Logout
                  </a>
                </div>
              </li>
            {:else}
              <li class="nav-item nav-justify-content-end">
                <a href={resolve("/auth/login")} class="nav-link text-dark">
                  Login
                </a>
              </li>
            {/if}
          </ul>
        </div>
      </div>
    </nav>
  </header>
{/if}

<main class="pb-3">{@render children()}</main>

<footer class="flex justify-center border-t border-neutral-200 p-4">
  &copy; 2026 - TeamProject -&nbsp;<a href={resolve("/")}>Privacy</a>
</footer>
