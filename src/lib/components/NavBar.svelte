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

<nav class="fixed top-0 left-0 z-40 w-64 h-screen" aria-label="Sidebar">
	<div
		class="grid h-full px-3 py-4 overflow-y-auto grid-rows-[auto,1fr,auto] bg-gray-50 dark:bg-gray-800"
	>
		<div>
			<ul class="space-y-2">
				<li>
					<Button href="/" class="w-full">All</Button>
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
	</div>
</nav>
