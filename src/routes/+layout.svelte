<script lang="ts">
	import '../app.css';
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { page } from '$app/stores';
	import NavBar from '$lib/components/NavBar.svelte';

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
</script>

{#if !$page.url.pathname.startsWith('/auth')}
	<div class="grid h-full w-screen grid-cols-1 overflow-hidden text-smd md:grid-cols-[280px,1fr]">
		<NavBar {data} />
		<slot />
	</div>
{:else}
	<slot />
{/if}
