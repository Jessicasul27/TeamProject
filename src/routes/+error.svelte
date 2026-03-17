<script lang="ts">
  import { page } from "$app/state";
</script>

<div class="flex flex-col items-center gap-2">
  <h1 class="text-4xl font-semibold">{page.status}</h1>
  <p class="text-xl">{page.error?.message}</p>
</div>
