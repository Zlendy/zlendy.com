<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import utc from 'dayjs/plugin/utc';

	for (const plugin of [relativeTime, utc]) dayjs.extend(plugin);

	interface Props {
		prefix: string;
		date: dayjs.Dayjs;
		now: dayjs.Dayjs;
	}

	let { prefix, date, now }: Props = $props();
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger>
			{prefix}
			{now.diff(date, 'days', true) < 7 // Posted in the last week
				? date.from(now) // Show relative time
				: date.format('[on] DD/MMM/YYYY [at] HH:mm')}
		</Tooltip.Trigger>
		<Tooltip.Content>
			{date.utc().format('dddd, MMMM DD, YYYY [at] HH:mm TZ')}
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
