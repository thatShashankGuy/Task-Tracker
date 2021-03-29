import React, {useState,useEffect} from 'react'
import Taskdata from './Taskdata'
import Timer from './Timer'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Task from './Task'
import Alert from 'react-bootstrap/Alert'
import {ipcRenderer, ipcMain} from 'electron'
import Particles from 'react-particles-js';
import '../App.css'




const App = () => {
	const [tasks, setTask] = useState([]);
	const [alert, setAlert] = useState({
		show : 'false',
		variant : 'sucess',
		message :''
	})


	useEffect(() => {
		ipcRenderer.send('data:load')
	
		ipcRenderer.on('data:get', (e, tasks) => {
			setTask(JSON.parse(tasks))
		})
	
		// ipcRenderer.on('data:clear', () => {
		// 	setTask([])
		//   showAlert('All tasks Cleared')
		// })
	  }, [])
	
	const addTask = (task) => {
		if(task.desc === '' || task.author ==='' || task.priority === ''){
			console.log('Please enter all fields')
		}

		ipcRenderer.send('data:add',task)

	showAlert('Task Added')
	
	}

	const clearTask = () => {
		ipcRenderer.send('data:clear')
		setTask([])
		showAlert('All tasks Cleared')
	}

	const deleteTask = (_id) => {
		ipcRenderer.send('data:remove',_id)
		showAlert('task cleared')
	}

	const showAlert = ( message,variant = 'success', setTime = 2000) => {
		setAlert({
			show : 'false',
			variant,
			message
		})

		setTimeout(() => {
			setAlert({
				show : 'false',
				variant,
				message
			})
		},setTime)
	}


	const particlesobj = {
		number: {
		  value: 900,
		  density: {
			  enable: true,
			  value_area: 1000
		  }
	  },
	  color: {
		  value: '#0d0c0c'
	  },
	  opacity: {
		  value: 0.5,
		  anim: {
			  enable: true
		  }
	  },
	  size: {
		  value: 7,
		  random: true,
		  anim: {
			  enable: true,
			  speed: 3
		  }
	  },
	  line_linked: {
		  enable: false
	  },
	  move: {
		  speed: 0.2
	  }
	}


	return (
		<Container className = 'App'>
			<Particles className = 'particles' params ={particlesobj}/>
			<Timer/>
			<Task addTask = {addTask}/>
			{alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
		<Table>
		<thead>
          <tr>
            <th>Description</th>
            <th>Author </th>
            <th>Created at</th>
			<th>Priority</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
			{tasks.map( task => (<Taskdata key={task._id} task={task} deleteTask={deleteTask}/>))}
        </tbody>
		</Table>
		<Button type='submit' variant='danger' block onClick = {() => clearTask()} >
                Clear All Task
              </Button>
		</Container>
	)
}

export default App
