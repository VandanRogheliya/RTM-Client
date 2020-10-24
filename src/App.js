import React, { useState } from 'react'
import './assets/css/nucleo-icons.css'
import './assets/scss/blk-design-system-react.scss?v=1.1.0'
import './assets/css/style.css'
// import './assets/demo/demo.css'

import './App.css'
import Home from './views/Home'
import Mission from './views/Mission'

import month from './sampleData/month.json'
import week from './sampleData/week.json'
import long from './sampleData/long.json'
import task from './sampleData/task.json'

var monthData = new Map()
var weekData = new Map()
var longData = new Map()
var taskData = new Map()

month.forEach(e => (monthData[e.id] = e))
week.forEach(e => (weekData[e.id] = e))
long.forEach(e => (longData[e.id] = e))
task.forEach(e => (taskData[e.id] = e))

function App() {
	const [data, setData] = useState({
		task: taskData,
		week: weekData,
		month: monthData,
		long: longData,
	})

	const [home, setHome] = useState(true) // add the functionality
	// const [type, setType] = useState('')

	return (
		<div className="App">
			{home ? (
				<Home data={data} />
			) : (
				<Mission type={'Month'} id={'1'} data={data} setHome={e => setHome(e)} />
			)}
		</div>
	)
}

export default App
