import React from 'react'
import Button from 'react-bootstrap/Button'
import Moment from 'react-moment'
import Badge from 'react-bootstrap/Badge'

const Taskdata = ({task,deleteTask}) => {
  const setVariant = () => {
    if (task.priority === 'high') {
      return 'danger'
    } else if (task.priority === 'moderate') {
      return 'warning'
    } else {
      return 'success'
    }
  }

  return (
    <tr>
      <td>{task.desc}</td>
      <td>{task.author}</td>
      <td>
        <Moment format='MMMM Do YYYY, h:mm:ss a'>{new Date(task.ctr)}</Moment>
      </td>
      <td> <Badge variant={setVariant()} className='p-2'>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </Badge></td>
      <td>
          <Button variant ='danger' size ='sm' onClick = {() => deleteTask(task._id)} > Delete </Button>  
      </td>
    </tr>   

  )
}

export default Taskdata
