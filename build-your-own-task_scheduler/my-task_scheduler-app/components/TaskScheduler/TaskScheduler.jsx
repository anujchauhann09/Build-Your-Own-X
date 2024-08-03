import { useState, useEffect } from 'react'
import './TaskScheduler.css'

export default function TaskScheduler() {
    const [tasks, setTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const [task, setTask] = useState("")
    const [priority, setPriority] = useState("Top Priority")
    const [deadline, setDeadline] = useState("")

    const handleTaskChange = (e) => {
        setTask(e.target.value)
    }

    const handlePriorityChange = (e) => {
        setPriority(e.target.value)
    }

    const handleDeadlineChange = (e) => {
        setDeadline(e.target.value)
    }

    const taskHandler = () => {
        if(task.trim() === "") {
            alert(`Please enter a task`)
            return
        }
        else if(deadline === "") {
            alert(`Select a valid deadline`)
            return
        }

        let selectedDate = new Date(deadline)
        let currentDate = new Date()

        if(selectedDate < currentDate) {
            alert(`Please select a future date for deadline`)
            return
        }

        const newTask = {
            id: tasks.length + 1,
            task,
            priority,
            deadline,
            done: false
        }

        console.log(newTask)

        setTasks([...tasks, newTask])

        console.log(tasks)

        setTask("")
        setPriority("top")
        setDeadline("")
    }

    const markDone = (id) => {
        const updatedTasks = tasks.map(task => 
            task.id === id ? {...task, done: true} : task
        )
        setTasks(updatedTasks)

        const completedTask = tasks.find(task => task.id === id)
        if(completedTask && !completedTasks.find(task => task.id === id))
            setCompletedTasks([...completedTasks, completedTask])
    }

    /*
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []
        const savedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks')) || []
        setTasks(savedTasks);
        setCompletedTasks(savedCompletedTasks)
    }, []);
    
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks))
    }, [tasks, completedTasks])
    */

    const upcomingTasks = tasks.filter(task => !task.done)

    return (
        <>
            <header>

            </header>
            <main>
                <div className="tasksContainer">
                    <h1>Task Scheduler</h1>
                    <div className="inputTasksBox">
                        <input type="text" placeholder="Enter text..." className='inputFields' id='inputTask' value={task} onChange={handleTaskChange} />
                        <select id="selectPriority" className='inputFields' value={priority} onChange={handlePriorityChange} >
                            <option value="Top Priority" className='optionFields'>Top Priority</option>
                            <option value="Middle Priority" className='optionFields'>Middle Priority</option>
                            <option value="Low Priority" className='optionFields'>Low Priority</option>
                        </select>
                        <input type="date" className='inputFields' value={deadline} onChange={handleDeadlineChange} />
                        <button id="taskHandler" onClick={taskHandler}>Add Task</button>
                    </div>
                    <div className="upcomingTasksBox">
                        <h2 id='upcomingTasksHeading'>Upcoming Tasks</h2>
                        <div className="upcomingTasks">
                            <div className="upcomingTasksHeading">
                                <span className='upcomingTaskHeading'>Task Name</span>
                                <span className='upcomingTaskHeading'>Priority</span>
                                <span className='upcomingTaskHeading'>Deadline</span>
                                <span className='upcomingTaskHeading'>Action</span>
                            </div>
                            <div className="upcomingTasksContent">
                                {
                                    upcomingTasks.map(task => {
                                        return (
                                            <div key={task.id} className='completed-dynamic-div'>
                                                <span className='upcomingTaskContent'>{task.task}</span>
                                                <span className='upcomingTaskContent'>{task.priority}</span>
                                                <span className='upcomingTaskContent'>{task.deadline}</span>
                                                <span className='upcomingTaskContent'>
                                                    {
                                                        !task.done &&
                                                            <button className='mark-done' onClick={() => markDone(task.id)}>
                                                                Mark Done
                                                            </button>
                                                    }
                                                </span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="completedTasksBox">
                        <h2 id='completedTasksHeader'>Completed Tasks</h2>
                        <div className="completedTasks">
                            <div className="completedTasksHeading">
                                <span className='completedTaskHeading'>Task Name</span>
                                <span className='completedTaskHeading'>Priority</span>
                                <span className='completedTaskHeading'>Deadline</span>
                            </div>
                            <div className="completedTasksContent">
                                {
                                    completedTasks.map(task => (
                                        <div key={task.id} className='completed-dynamic-div'>
                                            <span className='completedTaskContent'>{task.task}</span>
                                            <span className='completedTaskContent'>{task.priority}</span>
                                            <span className='completedTaskContent'>{task.deadline}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer>

            </footer>
        </>
    )
}
