<script lang="ts">
	import type { Snippet } from 'svelte';
	import { buttonVariants } from '$lib/components/ui/button/button.svelte';
	import { Check, Clipboard, X } from '@lucide/svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import Logo from '../logo.svelte';
	import { browser } from '$app/environment';

	interface Props {
		children?: Snippet;
		lang?: string;
	}

	let { children, lang }: Props = $props();

	let shikiElement = $state<HTMLElement>();
	let cleanedLang = $derived.by(() => {
		if (typeof lang !== 'string') return null;
		if (lang === 'undefined' || lang === 'null') return null;
		return lang;
	});

	enum ClipboardEnum {
		DEFAULT,
		SUCCESS,
		ERROR
	}

	let clipboardTimeoutId = $state<number>();
	let clipboardState = $state<ClipboardEnum>();

	async function copyToClipboard() {
		if (!browser) return;

		let copied = true;

		try {
			const text = shikiElement?.innerText;
			if (text === undefined) return;

			await navigator.clipboard.writeText(text);
		} catch {
			copied = false;
		} finally {
			clearTimeout(clipboardTimeoutId);
			clipboardState = copied ? ClipboardEnum.SUCCESS : ClipboardEnum.ERROR;
			window.setTimeout(() => (clipboardState = ClipboardEnum.DEFAULT), 1500);
		}
	}
</script>

<div
	class="bg-background border-primary/25 relative my-4 overflow-hidden rounded-xl border-2 dark:bg-[#232136]"
>
	<div class="border-primary/25 text-primary flex justify-between border-b-2 px-4 py-2">
		<span>
			{#if cleanedLang}
				<Logo name={cleanedLang} class="!bg-primary" />&nbsp;
			{/if}
			{cleanedLang ?? 'text'}
		</span>
		<Tooltip.Provider delayDuration={0} disableCloseOnTriggerClick>
			<Tooltip.Root>
				<Tooltip.Trigger
					class={buttonVariants({
						variant: 'ghost',
						size: 'icon',
						class:
							'size-6 bg-transparent hover:!bg-[hsl(245_30%_85%)] hover:text-[hsl(245_30%_25%)]'
					})}
					onclick={copyToClipboard}
				>
					{#if clipboardState === ClipboardEnum.SUCCESS}
						<Check />
					{:else if clipboardState === ClipboardEnum.ERROR}
						<X />
					{:else}
						<Clipboard />
					{/if}
				</Tooltip.Trigger>
				<Tooltip.Content>
					{#if clipboardState === ClipboardEnum.SUCCESS}
						Copied
					{:else if clipboardState === ClipboardEnum.ERROR}
						Error
					{:else}
						Copy to clipboard
					{/if}
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	</div>
	<div bind:this={shikiElement}>
		{@render children?.()}
	</div>
</div>
