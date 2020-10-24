import React, { useState } from 'react'
import './assets/css/nucleo-icons.css'
import './assets/scss/blk-design-system-react.scss?v=1.1.0'
import './assets/css/style.css'
// import './assets/demo/demo.css'

import './App.css'
import Home from './views/Home'
import Mission from './views/Mission'

// import month from './sampleData/month.json'
// import week from './sampleData/week.json'
// import long from './sampleData/long.json'
// import task from './sampleData/task.json'

function App() {
	const [isLoading, setIsLoading] = useState(false)

	const [data, setData] = useState({
		task: -1,
		week: -1,
		month: -1,
		long: -1,
	})

	const [home, setHome] = useState(true)
	const [type, setType] = useState('')
	const [id, setId] = useState(0)

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

		task.forEach(e => (taskData[e.id] = e))
		week.forEach(e => (weekData[e.id] = e))
		month.forEach(e => (monthData[e.id] = e))
		long.forEach(e => (longData[e.id] = e))

		setData({
			task: taskData,
			week: weekData,
			month: monthData,
			long: longData,
		})
	}

	if (data.task === -1) getData()
	
	return (
		<div className="App">
			{isLoading ? (
				<h1>Loading...</h1>
			) : home ? (
				<Home data={data} setType={e => setType(e)} setId={e => setId(e)} setHome={e => setHome(e)} />
			) : (
				<Mission type={type} id={id} data={data} setHome={e => setHome(e)} />
			)}
		</div>
	)
}

export default App
