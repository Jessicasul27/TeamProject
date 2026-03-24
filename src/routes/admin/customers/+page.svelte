<script>
  let { data } = $props();

  let search = $state("");

  const filteredCustomers = $derived.by(() => {
    const searchLowercase = search.toLocaleLowerCase();

    return data.customers.filter((customer) => {
      return (
        customer.user.firstName.toLocaleLowerCase().includes(searchLowercase) ||
        customer.user.lastName.toLocaleLowerCase().includes(searchLowercase)
      );
    });
  });
</script>

<div>
  You're logged in as
  {data.user?.firstName}
  {data.user?.lastName}
</div>

<label for="a">Search by name:</label>
<input id="a" type="text" bind:value={search}>

<div class="flex flex-col gap-2">
  {#each filteredCustomers as customer}
    <div class="flex gap-2">
      <div>{customer.user.firstName}</div>
      <div>{customer.user.lastName}</div>
      <div>{customer.user.email}</div>
    </div>
  {/each}
</div>
