import React from 'react'
import '../css/loading.css'

export default function Loading() {
	return (
		<div className="fixed inset-0 overscroll-hidden flex items-center justify-center">
			<div className="sk-folding-cube">
				<div className="sk-cube1 sk-cube"></div>
				<div className="sk-cube2 sk-cube"></div>
				<div className="sk-cube4 sk-cube"></div>
				<div className="sk-cube3 sk-cube"></div>
			</div>
		</div>
	)
}
