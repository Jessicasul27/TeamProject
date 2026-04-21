<script lang="ts">
  const { data } = $props();

  const maxValue = Math.max(...data.chartData.map((item) => item.total), 1);

  const moneyFormatter = new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  function formatMoney(value: number) {
    return moneyFormatter.format(value);
  }
</script>

<div class="space-y-6">
  <div
    class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h1 class="text-3xl font-bold">Landlord Income</h1>
      <p class="text-base-content/70">
        {#if data.view === "weekly"}
          Income for the past 12 weeks, based on booking date.
        {:else}
          Income for the past 12 months, based on booking date.
        {/if}
      </p>
    </div>

    <div class="join">
      <a
        href="?view=weekly"
        class={`btn join-item ${data.view === "weekly" ? "btn-primary" : "btn-outline"}`}>
        Weekly
      </a>

      <a
        href="?view=monthly"
        class={`btn join-item ${data.view === "monthly" ? "btn-primary" : "btn-outline"}`}>
        Monthly
      </a>
    </div>
  </div>

  <div class="stats stats-vertical w-full shadow md:stats-horizontal">
    <div class="stat">
      <div class="stat-title">Total Earned (before share)</div>
      <div class="stat-value">{formatMoney(data.totalEarned)}</div>
    </div>

    <div class="stat">
      <div class="stat-title">Share %</div>
      <div class="stat-value text-primary">{data.incomeSharePercentage}%</div>
    </div>

    <div class="stat">
      <div class="stat-title">Total Income (after share)</div>
      <div class="stat-value text-secondary">
        {formatMoney(data.totalIncome)}
      </div>
    </div>
  </div>

  {#if data.chartData.some((item) => item.total > 0)}
    <div class="card bg-base-100 shadow">
      <div class="card-body">
        <h2 class="card-title">
          {data.view === "weekly" ? "Weekly income" : "Monthly income"}
        </h2>

        <div class="h-80">
          <div class="grid h-full grid-cols-12 gap-3">
            {#each data.chartData as item}
              <div
                class="grid h-full min-w-0 grid-rows-[2rem_minmax(0,1fr)_3rem]">
                <div
                  class="flex items-center justify-center text-center text-xs font-medium whitespace-nowrap">
                  {formatMoney(item.total)}
                </div>

                <div class="flex min-h-0 items-end overflow-hidden">
                  <div
                    class="w-full rounded-t-lg bg-primary"
                    style={`height: ${
                    item.total > 0
                      ? Math.min(Math.max((item.total / maxValue) * 100, 8), 96)
                      : 0
                  }%`}
                    title={`${item.labelTop} ${item.labelBottom}: ${formatMoney(item.total)}`}></div>
                </div>

                <div
                  class="flex flex-col items-center justify-start pt-2 text-center text-xs leading-tight text-base-content/70">
                  <div>{item.labelTop}</div>
                  <div>{item.labelBottom}</div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div class="alert"><span>No booking income in this period yet.</span></div>
  {/if}
</div>
