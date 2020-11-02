import React, { useReducer, useState } from 'react'

// Importing Components
import PageHeader from '../components/PageHeader'
import Menu from '../components/Menu'
import SearchBar from '../components/SearchBar'
import TableList from '../components/TableList'

// Importing Bootstrap Components
import { Button } from 'reactstrap'

// Which catagory to display initially
const initialState = { task: true, week: true, month: true, long: true, all: true }

// Changing catagory display
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

// Home Component defination
function Home({ data, setType, setId, setHome }) {
	// Search Query State
	const [searchQuery, setSearchQuery] = useState('')

	// Catagory reducer
	const [category, setCategoryTo] = useReducer(reducer, initialState)

	// Rendering JSX
	return (
		<div className="home-page">
			{/* Page Header component. Title and Quotes  */}
			<div className="wrapper index-page">
				<PageHeader />
			</div>

			{/* Conditionally displays home button */}
			{!category.all && (
				<Button color="primary" onClick={() => setCategoryTo('')}>
					Home
				</Button>
			)}

			{/* Search Bar */}
			<SearchBar setSearchQuery={newQuery => setSearchQuery(newQuery)} />

			{/* Conditionally displays result table */}
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

			{/* Catagory selection menue */}
			{category.all && (
				<Menu setCategoryTo={type => setCategoryTo(type)} data={data} setHome={e => setHome(e)} />
			)}
		</div>
	)
}

export default Home
