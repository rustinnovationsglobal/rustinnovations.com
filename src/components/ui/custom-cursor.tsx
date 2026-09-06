// src/components/ui/custom-cursor.tsx
'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
	const dotRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const moveCursor = (e: MouseEvent) => {
			if (dotRef.current) {
				dotRef.current.style.transform = `translate3d(${e.clientX - 7}px, ${e.clientY - 7}px, 0)`;
			}
		};

		document.addEventListener('mousemove', moveCursor);
		return () => document.removeEventListener('mousemove', moveCursor);
	}, []);

	// Hide the default cursor
	useEffect(() => {
		document.body.style.cursor = 'none';
		return () => {
			document.body.style.cursor = '';
		};
	}, []);

	return (
		<div
			ref={dotRef}
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: 14,
				height: 14,
				borderRadius: '50%',
				background: '#ef4444',
				border: '1px solid #f87171',
				pointerEvents: 'none',
				zIndex: 10000,
				transformOrigin: 'center',
				transition: 'transform 0.12s cubic-bezier(.22,1,.36,1)',
			}}
		/>
	);
}
