import React from 'react'

// Importing Bootstrap components
import { Button, Table } from 'reactstrap'

// Table List component defination
export default function TableList({ data, searchQuery, display, setType, setId, setHome }) {
	// Population table with rows
	const populateTable = type => {
		var entries = []

		// Regex pattern. Checks the topic of a task/goal
		var pattern = new RegExp(searchQuery, 'gi')

		// Iterating through map
		for (var key in data[type]) {
			let id = key

			// If pattern fails then continue
			if (searchQuery && !pattern.test(data[type][key].topic)) continue

			// Else push the row in
			entries.push(
				<tr key={id}>
					<th scope="row">{type.toUpperCase()}</th>
					<td colSpan="3">
						<Button className="btn-link" color="primary" onClick={() => onSelect(type, id)}>
							{data[type][key].topic}
						</Button>
					</td>
				</tr>
			)
		}

		return entries
	}

	// Sets id and type of mission to display Mission Component
	const onSelect = (type, key) => {
		setId(key)
		setType(type)
		setHome(false)
	}

	// Rendering JSX
	return (
		<div>
			<Table className="mb-5 pb-5">
				<thead>
					<tr>
						<th>Type</th>
						<th colSpan="3">Topic</th>
					</tr>
				</thead>
				<tbody>
					{/* Checking each catagory */}
					{display.task && populateTable('task')}
					{display.week && populateTable('week')}
					{display.month && populateTable('month')}
					{display.long && populateTable('long')}
				</tbody>
			</Table>
		</div>
	)
}
