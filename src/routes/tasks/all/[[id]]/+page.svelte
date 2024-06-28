<script lang="ts">
	import type { Todo } from '$lib/app/todo/domain/todo.js';
	import type { PageData } from './$types';
	import { Input } from '$lib/components/ui/input/index.js';

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

<div class="grid grid-cols-2 px-5 py-5">
	<div class="pr-5">
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">All</h1>

		<form method="POST" class="mt-5">
			<Input
				name="title"
				type="text"
				placeholder="Add a task. Press Enter to save."
				class="max-w"
			/>
		</form>

		<ul class="list-none">
			{#each data.todos as todo (todo.id)}
				<li
					class="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 mb-2 shadow-sm flex items-center hover:bg-gray-200 first:mt-5 mt-2.5"
				>
					<input
						type="checkbox"
						class="mr-2 h-4 w-4 accent-black border-gray-50 rounded"
						bind:checked={todo.props.completed}
						on:change={(e) => handleCheckboxChange(e, todo.id)}
					/>
					<span class="flex-grow">{todo.props.title}</span>
					<button class="delete-button" on:click={() => handleDelete(todo.id)}>Delete</button>
				</li>
			{/each}
		</ul>
	</div>
	<div class="bg-gray-50"></div>
</div>
