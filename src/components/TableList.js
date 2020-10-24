import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import {
	Button,
	Label,
	FormGroup,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Container,
	Row,
	Col,
	Table,
} from 'reactstrap'

// String.prototype.toProperCase = function () {
// 	return this.replace(/\w\S*/g, function (txt) {
// 		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
// 	})
// }

export default function TableList({ data, searchQuery, display, setType, setId, setHome }) {
	const populateTable = type => {
		var entries = []
		var pattern = new RegExp(searchQuery, 'gi')
		for (var key in data[type]) {
			let id = key
			if (searchQuery && !pattern.test(data[type][key].topic)) continue

			entries.push(
				<tr>
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

	const onSelect = (type, key) => {
		console.log(key);
		setId(key)
		setType(type)
		setHome(false)
	}

	// useEffect(() => {}, [searchQuery])

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
					{display.task && populateTable('task')}
					{display.week && populateTable('week')}
					{display.month && populateTable('month')}
					{display.long && populateTable('long')}
				</tbody>
			</Table>
		</div>
	)
}
