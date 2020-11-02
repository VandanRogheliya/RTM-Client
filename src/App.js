import React, { useState } from 'react'

// Styles
import './assets/css/nucleo-icons.css'
import './assets/scss/blk-design-system-react.scss?v=1.1.0'
import './assets/css/style.css'
import './App.css'

// Components
import Home from './views/Home'
import Mission from './views/Mission'
import Visualize from './views/Visualize'

// App Component
function App() {

	// Loading State
	const [isLoading, setIsLoading] = useState(true)

	// Data State
	const [data, setData] = useState({
		task: -1,
		week: -1,
		month: -1,
		long: -1,
	})

	// Home State, if true shows Home else Mission 
	const [home, setHome] = useState(1)

	// States of goal/task for Mission component
	const [type, setType] = useState('')
	const [id, setId] = useState(0)

	// Fetching All Data
	const getData = async () => {
		var taskData = new Map()
		var weekData = new Map()
		var monthData = new Map()
		var longData = new Map()

		var task = await fetch('http://localhost:5000/task')
		task = await task.json()

		var week = await fetch('http://localhost:5000/week')
		week = await week.json()

		var month = await fetch('http://localhost:5000/month')
		month = await month.json()

		var long = await fetch('http://localhost:5000/long')
		long = await long.json()

		// Storing each task/goal in form of map. Key -> ID and Value -> task/goal object
		task.forEach(e => (taskData[e.id] = e))
		week.forEach(e => (weekData[e.id] = e))
		month.forEach(e => (monthData[e.id] = e))
		long.forEach(e => (longData[e.id] = e))

		// Changing State
		setData({
			task: taskData,
			week: weekData,
			month: monthData,
			long: longData,
		})

		// Setting Loading to false
		setIsLoading(false)
	}

	// If data has not yet been fetch, then fetch it
	if (data.task === -1) getData()
	// TODO: Uncomment code
	// Rendering JSX
	return (
		<div className="App">
			{isLoading ? (
				<h1>Loading...</h1>
			) : home === 1 ? (
				<Home data={data} setType={e => setType(e)} setId={e => setId(e)} setHome={e => setHome(e)} />
			) : home === 0 ? (
				<Mission type={type} id={id} data={data} setHome={e => setHome(e)} />
			) : 
			<Visualize data={data} setHome={e => setHome(e)}/> 
			}

			{/* {isLoading ? (
				<h1>Loading...</h1>
			): 
			<Visualize data={data} /> 
			} */}
		</div>
	)
}

export default App
