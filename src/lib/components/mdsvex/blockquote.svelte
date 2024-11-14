<blockquote class="relative my-4 ml-4 italic">
	<slot></slot>
</blockquote>

<style lang="scss">
	blockquote::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: -1rem;
		width: 0.25rem;
		background-color: hsl(var(--foreground));
	}
</style>
