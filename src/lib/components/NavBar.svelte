<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	export let data;
	$: ({ supabase } = data);

	function handleLogout() {
		supabase.auth.signOut({
			scope: 'local'
		});
	}
</script>

<nav
	class="grid h-screen grid-cols-1 grid-rows-[auto,1fr,auto] overflow-hidden max-md:hidden bg-gray-50 px-3 py-4"
	aria-label="Sidebar"
>
	<div>
		<ul class="space-y-2">
			<li>
				<Button href="/tasks/all" class="w-full">All</Button>
			</li>
			<li>
				<Button href="/" class="w-full" variant="ghost">Today</Button>
			</li>
			<li>
				<Button href="/" class="w-full" variant="ghost">Next 7 Days</Button>
			</li>
			<li>
				<Button href="/" class="w-full" variant="ghost">Inbox</Button>
			</li>
		</ul>
	</div>
	<div></div>
	<div>
		<ul class="space-y-2">
			<li>
				<Button class="w-full" variant="outline" on:click={handleLogout}>Logout</Button>
			</li>
		</ul>
	</div>
</nav>
