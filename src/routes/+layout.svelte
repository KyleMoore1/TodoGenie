<script>
	import '../app.css';
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;
	$: ({ session, supabase } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (!newSession) {
				/**
				 * Queue this as a task so the navigation won't prevent the
				 * triggering function from completing
				 */
				setTimeout(() => {
					goto('/', { invalidateAll: true });
				});
			}
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	function handleLogout() {
		supabase.auth.signOut({
			scope: 'local'
		});
	}
</script>

<div class="navbar bg-blue-100">
	<div class="flex-1">
		<a class="btn btn-ghost normal-case text-xl" href="/">TickTickClone</a>
	</div>
	<div class="flex-none">
		<button class="btn btn-outline" on:click={handleLogout}>Logout</button>
	</div>
</div>

<slot />
