import React, { useReducer, useState } from 'react'
import PageHeader from '../components/PageHeader'

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
import Menu from '../components/Menu'
import SearchBar from '../components/SearchBar'
import TableList from '../components/TableList'



const initialState = { task: true, week: true, month: true, long: true, all: true }

const reducer = (state, action) => {
	switch (action) {
		case 'task':
			return { task: true, week: false, month: false, long: false, all: false }
		case 'week':
			return { task: false, week: true, month: false, long: false, all: false }
		case 'month':
			return { task: false, week: false, month: true, long: false, all: false }
		case 'long':
			return { task: false, week: false, month: false, long: true, all: false }
		default:
			return initialState
	}
}

function Home({data, setType, setId, setHome}) {


	const [searchQuery, setSearchQuery] = useState('')

	// const [category, setCategory] = useState()

	const [category, setCategoryTo] = useReducer(reducer, initialState)

	return (
		<div className="home-page">
			<div className="wrapper index-page">
				<PageHeader />
			</div>

			{!category.all && (
				<Button color="primary" onClick={() => setCategoryTo('')}>
					Home
				</Button>
			)}

			<SearchBar setSearchQuery={newQuery => setSearchQuery(newQuery)} />

			{(searchQuery || !category.all) && (
				<TableList
					data={data}
					display={category}
					searchQuery={searchQuery}
					setType={e => setType(e)}
					setId={e => setId(e)}
					setHome={e => setHome(e)}
				/>
			)}

			{category.all && <Menu setCategoryTo={type => setCategoryTo(type)} data={data}/>}
		</div>
	)
}

export default Home
