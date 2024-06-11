<script lang="ts">
	import type { Todo } from '$lib/todo/Todo.ts';
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

		<div class="flex flex-col items-center">
			<ul class="list-none">
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
	</div>
	<div class="bg-gray-50"></div>
</div>
