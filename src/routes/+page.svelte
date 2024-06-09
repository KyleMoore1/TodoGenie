<script lang="ts">
	import type { Todo } from '$lib/todo/Todo.ts';
	import type { PageData } from './$types';
	import { todoService } from '$lib/services';
	import type { HtmlTagDescriptor } from 'vite';

	export let data: PageData;

	async function handleCheckboxChange(event: Event, todoId: string) {
		const checked: boolean = (event.currentTarget as HTMLInputElement).checked;
		if (checked) {
			await fetch(`/api/v1/todos/${todoId}/complete`, {
				method: 'POST'
			});
		} else {
			await fetch(`/api/v1/todos/${todoId}/uncomplete`, {
				method: 'POST'
			});
		}
	}
	async function handleDelete(todoId: string) {
		await fetch(`/api/v1/todos/${todoId}`, {
			method: 'DELETE'
		});
		data.todos = data.todos.filter((todo: Todo) => todo.id !== todoId);
	}
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
			<li
				class="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 mb-2 shadow-sm flex items-center hover:bg-gray-200"
			>
				<input
					type="checkbox"
					class="mr-2"
					bind:checked={todo.completed}
					on:change={(e) => handleCheckboxChange(e, todo.id)}
				/>
				<span class="flex-grow">{todo.title}</span>
				<button class="delete-button" on:click={() => handleDelete(todo.id)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
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
