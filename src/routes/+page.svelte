<script lang="ts">
	import type { Todo } from '$lib/todo/Todo.js';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<form method="POST">
	<label>
		add a todo:
		<input name="title" autocomplete="off" />
	</label>
</form>

<div class="centered">
	<h1>todos</h1>

	<ul class="todos">
		{#each data.todos as todo (todo.id)}
			<li>
				{todo.title}
			</li>
		{/each}
	</ul>
</div>
