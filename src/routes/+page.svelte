<script lang="ts">
	import type { Todo } from '$lib/todo/Todo.js';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.user}
	<h1 class="text-4xl font-bold text-center my-8">
		Welcome to TickTickClone, {data.user.email}
	</h1>
{/if}
<p class="text-center mb-4">
	Visit <a href="https://kit.svelte.dev" class="text-blue-500 hover:underline">kit.svelte.dev</a> to
	read the documentation
</p>

<form method="POST" class="mb-8 flex justify-center">
	<label class="input-group">
		<span class="input-group-addon">add a todo:</span>
		<input name="title" autocomplete="off" class="input input-bordered" />
	</label>
</form>

<div class="centered flex flex-col items-center">
	<h1 class="text-3xl font-semibold mb-4">Todos</h1>

	<ul class="todos list-none p-0">
		{#each data.todos as todo (todo.id)}
			<li class="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 mb-2 shadow-sm">
				{todo.title}
			</li>
		{/each}
	</ul>
</div>

<style>
	.centered {
		max-width: 600px;
		margin: 0 auto;
	}
</style>
