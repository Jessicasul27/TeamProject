<script lang="ts">
	import { superForm } from "sveltekit-superforms";
	import { zod4Client } from "sveltekit-superforms/adapters";
	import { propertyEditSchema } from "$lib/schemas/property";
	import { PropertyStatus, PropertyType } from "$lib/enums";

	let { data } = $props();

	const { form, errors, constraints, enhance } = superForm(data.form, {
		validators: zod4Client(propertyEditSchema),
		validationMethod: "oninput",
	});
</script>

<form method="POST" action="?/update" enctype="multipart/form-data" use:enhance>
	<input type="hidden" name="id" bind:value={$form.id} />

	<div class="border p-3 mt-4">
		<div class="row pb-2">
			<h2 class="text-primary pl-3">Edit Property</h2>
		</div>

		<div class="border p-3 mt-4">
			<div class="mb-3">
				<label for="title">Title</label>
				<input
					bind:value={$form.title}
					aria-invalid={$errors.title ? "true" : undefined}
					id="title"
					name="title"
					class="form-control"
					{...$constraints.title}
				/>
				{#if $errors.title}
					<span class="text-danger">{$errors.title}</span>
				{/if}
			</div>

			<div class="mb-3">
				<label for="location">Location</label>
				<input
					bind:value={$form.location}
					aria-invalid={$errors.location ? "true" : undefined}
					id="location"
					name="location"
					class="form-control"
					{...$constraints.location}
				/>
				{#if $errors.location}
					<span class="text-danger">{$errors.location}</span>
				{/if}
			</div>

			<div class="mb-3">
				<label for="type">Property Type</label>
				<select id="type" name="type" class="form-select" bind:value={$form.type} aria-invalid={$errors.type ? "true" : undefined}>
					{#each Object.values(PropertyType) as type}
						<option value={type}>{type}</option>
					{/each}
				</select>
				{#if $errors.type}
					<span class="text-danger">{$errors.type}</span>
				{/if}
			</div>

			<div class="mb-3">
				<label for="pricePerNight">Price Per Night</label>
				<input
					bind:value={$form.pricePerNight}
					aria-invalid={$errors.pricePerNight ? "true" : undefined}
					id="pricePerNight"
					name="pricePerNight"
					type="number"
					step="0.01"
					class="form-control"
					{...$constraints.pricePerNight}
				/>
				{#if $errors.pricePerNight}
					<span class="text-danger">{$errors.pricePerNight}</span>
				{/if}
			</div>

			<div class="mb-3">
				<label for="status">Status</label>
				<select id="status" name="status" class="form-select" bind:value={$form.status} aria-invalid={$errors.status ? "true" : undefined}>
					{#each Object.values(PropertyStatus) as status}
						<option value={status}>{status}</option>
					{/each}
				</select>
				{#if $errors.status}
					<span class="text-danger">{$errors.status}</span>
				{/if}
			</div>

			<div class="mb-3">
				<label for="description">Description</label>
				<textarea
					bind:value={$form.description}
					aria-invalid={$errors.description ? "true" : undefined}
					id="description"
					name="description"
					class="form-control"
				>
				</textarea>
				{#if $errors.description}
					<span class="text-danger">{$errors.description}</span>
				{/if}
			</div>

			<div class="mb-3">
				<label for="shortDescription">Short Description</label>
				<textarea
					bind:value={$form.shortDescription}
					aria-invalid={$errors.shortDescription ? "true" : undefined}
					id="shortDescription"
					name="shortDescription"
					class="form-control"
				>
				</textarea>
				{#if $errors.shortDescription}
					<span class="text-danger">{$errors.shortDescription}</span>
				{/if}
			</div>

			<div class="mb-3">
				<label for="maxGuests">Max Guests</label>
				<input
					bind:value={$form.maxGuests}
					aria-invalid={$errors.maxGuests ? "true" : undefined}
					id="maxGuests"
					name="maxGuests"
					type="number"
					class="form-control"
					{...$constraints.maxGuests}
				/>
				{#if $errors.maxGuests}
					<span class="text-danger">{$errors.maxGuests}</span>
				{/if}
			</div>

			<div class="mb-3">
				<span>Current Display Image</span>
				<br />
				<img src={data.property.displayImage} width="200" class="mb-2" alt="" />
			</div>

			<div class="mb-3">
				<label for="displayFile">Replace Display Image</label>
				<input id="displayFile" type="file" name="displayFile" class="form-control" />
			</div>

			<div class="mb-3">
				<span>Gallery Images</span>
				<br />
				{#if data.property.images.length}
					{#each data.property.images as image (image.id)}
						<div style="display:inline-block; margin:10px;">
							<img src={image.imageUrl} width="150" alt="" />
							<br />
							<button type="submit" formaction="?/deleteImage" name="imageId" value={image.id} class="btn btn-danger btn-sm mt-1"> Delete </button>
						</div>
					{/each}
				{/if}
			</div>

			<div class="mb-3">
				<label for="galleryFiles">Add More Images</label>
				<input id="galleryFiles" type="file" name="galleryFiles" multiple class="form-control" />
			</div>

			<div class="mb-3">
				<button type="submit" class="btn btn-success">Update</button>
				<a href="../" class="btn btn-primary">Back to Index</a>
			</div>
		</div>
	</div>
</form>
