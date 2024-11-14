<th class="px-4" {...$$restProps}>
	<slot></slot>
</th>

<style lang="scss">
	th {
		border-bottom: 2px solid hsl(var(--foreground) / 75%);
	}

	th:not([align]) {
		text-align: left;
	}
</style>
