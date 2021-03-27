import React, { useCallback, useEffect, useState } from 'react'

// Importing graph
import Graph from 'react-graph-vis'
import { Button } from 'reactstrap'

// Defining Visualize component
function Visualize({ data, setHome }) {
  const [graph, setGraph] = useState(-1)

  // Setting options for Graph
  const options = {
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

  // Making Graph
  const makeGraph = useCallback(() => {
    var nodes = []
    var edges = []

    for (const type in data) {
      let size,
        letter,
        parentLetter,
        mass = 1
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
        let node = {
          id: letter + key,
          label: data[type][key].topic,
          size,
          mass,
        }
        if (data[type][key].completed) node.color = '#28a745'
        if (letter === 'L') {
          node.physics = false
        }

        nodes.push(node)
      }

      if (parentLetter !== null) {
        for (let key in data[type]) {
          if (data[type][key].parent_goal !== null) {
            edges.push({
              from: parentLetter + data[type][key].parent_goal,
              to: letter + key,
            })
          }
        }
      }
    }
    setGraph({ nodes, edges })
  }, [data])

  // Make graph if not already made
  useEffect(() => {
    if (graph === -1) makeGraph()
  }, [graph, makeGraph])

  return (
    <div>
      {graph !== -1 && <Graph graph={graph} options={options} />}
      <Button
        color='default'
        className='btn-round  back-btn'
        onClick={() => setHome(1)}
      >
        <i className='tim-icons icon-double-left' />
      </Button>
    </div>
  )
}

export default Visualize
