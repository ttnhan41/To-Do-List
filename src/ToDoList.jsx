import React, { useState } from 'react';
import EditTaskPopup from './EditTaskPopup.jsx';

function ToDoList() {
  const [tasks, setTasks] = useState(["Brush teeth", "Have breakfast", "Go jogging", "Take a shower"]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);

  // Add task
  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks(currentTasks => [...currentTasks, newTask]);
      setNewTask("");
    }
  }

  // Delete task
  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setEditingTaskIndex(null);
  }
  
  // Edit task
  function handleEditClick(index) {
    setEditingTaskIndex(index);
  }

  function handleSaveTask(newName) {
    if (newName.trim() !== "") {
      tasks[editingTaskIndex] = newName;
      setEditingTaskIndex(null);
    }
  }

  // Move task
  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
      setEditingTaskIndex(null);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
      setEditingTaskIndex(null);
    }
  }

  return (<div className="to-do-list">
            <h1>To-Do List</h1>
            <div className="add-task">
              <input 
                type="text"
                placeholder="Enter a new task name..."
                value={newTask}
                onChange={handleInputChange}
              />
              <button className="add-button" onClick={addTask}>
                Add
              </button>
            </div>
            <ol>
              {tasks.map((task, index) => 
                <li key={index}>
                  <span className="text">{task}</span>
                  <button className="move-button" onClick={() => moveTaskUp(index)}>
                    Move &#11014;
                  </button>
                  <button className="move-button" onClick={() => moveTaskDown(index)}>
                    Move &#11015;
                  </button>
                  <button className="edit-button" onClick={() => handleEditClick(index)}>
                    Edit
                  </button>
                  <button className="delete-button" onClick={() => deleteTask(index)}>
                    Delete
                  </button>
                </li>
              )}
            </ol>

            {editingTaskIndex !== null && (
              <EditTaskPopup
                task={tasks[editingTaskIndex]}
                onSave={handleSaveTask}
                onCancel={() => setEditingTaskIndex(null)}
              />
            )}
          </div>);
}

export default ToDoList;