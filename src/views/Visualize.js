import React, { useState } from 'react'
import Graph from 'react-graph-vis'
import { Button } from 'reactstrap'

function Visualize({ data, setHome }) {
	const [graph, setGraph] = useState(-1)

	const graph1 = {
		nodes: [
			{ id: 'L10', label: 'Long', size: 50 },
			{ id: 'M20', label: 'Monthly', size: 25 },
			{ id: 'W30', label: 'Weekly', size: 15 },
			{ id: 'T40', label: 'Task', size: 10 },
			// { id: 5, label: 'Node 5', title: 'node 5 tootip text' },
		],
		edges: [
			{ from: 'L10', to: 'M20' },
			{ from: 'W30', to: 'L10' },
			{ from: 'W30', to: 'T40' },
		],
	}

	const options = {
		// autoResize: true,
		height: '760px',
		width: '100%',
		layout: {
			hierarchical: false,
		},
		edges: {
			color: '#6c757d',
		},
		nodes: {
			shape: 'dot',
			color: '#007bff',
			font: '12px arial #f6f9fc',
		},
	}

	const events = {
		select: function (event) {
			var { nodes, edges } = event
		},
	}

	const makeGraph = () => {
		console.log(data)

		var nodes = []
		var edges = []

		for (const type in data) {
			// console.log(type);
			let size, letter, parentLetter, mass = 1
			if (type === 'long') {
				size = 40
				letter = 'L'
				parentLetter = null
			} else if (type === 'month') {
				size = 25
				letter = 'M'
				parentLetter = 'L'
				mass = 1.2
			} else if (type === 'week') {
				size = 15
				letter = 'W'
				mass = 1.5
				parentLetter = 'M'
			} else {
				size = 10
				letter = 'T'
				parentLetter = 'W'
				mass = 1.7
			}

			for (let key in data[type]) {
				let node = { id: letter + key, label: data[type][key].topic, size, mass }
				if (data[type][key].completed) node.color = '#28a745'
				if (letter === 'L') {
					node.physics = false
				}

				nodes.push(node)
			}

			if (parentLetter !== null) {
				for (let key in data[type]) {
					// console.log(data[type][key].parent_goal, parentLetter)
					if (data[type][key].parent_goal !== null) {
						edges.push({ from: parentLetter + data[type][key].parent_goal, to: letter + key })
					}
					// { id: letter + key, label: data[type][key].topic, size }
				}
			}
		}
		console.log(nodes, edges)
		setGraph({ nodes, edges })
	}

	if (graph === -1) makeGraph()

	return (
		<div>
			{graph !== -1 && (
				<Graph
					graph={graph}
					options={options}
					events={events}
					getNetwork={network => {
						//  if you want access to vis.js network api you can set the state in a parent component using this property
					}}
				/>
			)}
			<Button color="default" className="btn-round  back-btn" onClick={() => setHome(1)}>
				<i className="tim-icons icon-double-left" />
			</Button>
		</div>
	)
}

export default Visualize
