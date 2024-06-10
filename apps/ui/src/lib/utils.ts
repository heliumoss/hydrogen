import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import { readable } from 'svelte/store';
import { navigating } from '$app/stores';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export const resizeText = ({
	element,
	elements,
	minSize = 10,
	maxSize = 512,
	step = 1,
	unit = 'px'
}: {
	element: HTMLElement;
	elements?: HTMLElement[];
	minSize?: number;
	maxSize?: number;
	step?: number;
	unit?: string;
}) => {
	(elements || [element]).forEach((el) => {
		let i = minSize;
		let overflow = false;

		const parent = el.parentNode as HTMLElement;
		if (!parent) return;

		while (!overflow && i < maxSize) {
			el.style.fontSize = `${i}${unit}`;
			overflow = parent.scrollHeight > parent.clientHeight;

			if (!overflow) i += step;
		}
		console.log(i);

		// revert to last state where no overflow happened
		el.style.fontSize = `${i - step}${unit}`;
	});
};

export const strToColor = (str: string, sat = 100, light = 75) => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
		hash = hash & hash;
	}
	return `hsl(${hash % 360}, ${sat}%, ${light}%)`;
};
