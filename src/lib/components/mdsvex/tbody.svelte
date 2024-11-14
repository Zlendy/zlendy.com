<tbody>
	<slot></slot>
</tbody>

<style lang="scss">
	tbody :global(tr:nth-child(odd)) {
		background-color: hsl(var(--foreground) / 5%);
	}

	tbody :global(tr:hover) {
		background-color: hsl(var(--foreground) / 10%);
	}
</style>
