<script lang="ts">
	import { resolve } from "$app/paths";

	const { data } = $props();
</script>

<div class="container p-3">
	<div class="row pt-4 mb-3">
		<div class="col-6">
			<h3 class="text-primary">Property</h3>
		</div>

		<div class="col-6 text-end">
			<a href={resolve("/properties/create")} class="btn btn-primary"> Create New Property </a>
		</div>
	</div>

	<table class="table table-bordered table-striped">
		<thead>
			<tr>
				<th>Name</th>
				<th>Location</th>
				<th>Property Type</th>
				<th>Price Per Night</th>
				<th>Max Guests</th>
				<th>Status</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each data.properties as property (property.id)}
				<tr>
					<td>{property.title}</td>
					<td>{property.location}</td>
					<td>{property.type}</td>
					<td>€{property.pricePerNight}</td>
					<td>{property.maxGuests}</td>
					<td>{property.status}</td>
					<td>
						<a href={resolve(`/admin/properties/${property.id}/edit`)} class="btn btn-success btn-sm mx-1">Edit</a>
						<a href={resolve(`/admin/properties/${property.id}/delete`)} class="btn btn-danger btn-sm mx-1">Delete</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
