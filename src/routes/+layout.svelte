<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/header.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import Footer from '$lib/components/footer.svelte';
</script>

<ModeWatcher />
<Header />
<slot></slot>
<Footer />
