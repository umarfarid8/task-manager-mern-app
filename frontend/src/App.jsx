import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  // 1. GET: Saare tasks laane ke liye
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error("Data fetch karne mein error aaya:", error);
    }
  };

  // 2. POST: Naya task add karne ke liye
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Task ka title likhna lazmi hai!");
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/tasks', { title, description });
      setTitle('');
      setDescription('');
      fetchTasks(); // List ko refresh karne ke liye
    } catch (error) {
      console.error("Task add karne mein masla hua:", error);
    }
  };

  // 3. PUT: Task ko complete/uncomplete toggle karne ke liye
  const handleToggleComplete = async (id, currentStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        completed: !currentStatus // Status ko ulta kar ke bhej rahe hain
      });
      fetchTasks(); // UI ko refresh karne ke liye
    } catch (error) {
      console.error("Task status update karne mein masla hua:", error);
    }
  };

  // 4. DELETE: Task ko hamesha ke liye hatane ke liye
  const handleDeleteTask = async (id) => {
    if (window.confirm("क्या aap is task ko delete karna chahte hain?")) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`);
        fetchTasks(); // UI ko refresh karne ke liye
      } catch (error) {
        console.error("Task delete karne mein masla hua:", error);
      }
    }
  };

  return (
    <div style={{ maxWidth: '550px', margin: '40px auto', fontFamily: 'Arial', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Umar's Task Manager</h2>
      
      {/* INPUT FORM */}
      <form onSubmit={handleAddTask} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Task Title (e.g., Learn React)" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input 
          type="text" 
          placeholder="Task Description (Optional)" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Add New Task
        </button>
      </form>

      <hr />

      {/* TASKS LIST */}
      <h3>My Tasks:</h3>
      {tasks.length === 0 ? (
        <p style={{ color: 'gray' }}>Abhi koi task nahi hai. Naya task add karein!</p>
      ) : (
        <ul style={{ paddingLeft: '0', listStyleType: 'none' }}>
          {tasks.map((task) => (
            <li key={task._id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '10px', 
              borderBottom: '1px solid #eee',
              marginBottom: '5px',
              backgroundColor: task.completed ? '#f8f9fa' : 'transparent',
              borderRadius: '4px'
            }}>
              {/* Agar task complete ho to text par line cutting (line-through) lag jaye */}
              <div style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'gray' : 'black', flex: 1 }}>
                <strong>{task.title}</strong>
                {task.description && <p style={{ margin: '2px 0 0 0', color: 'gray', fontSize: '14px' }}>{task.description}</p>}
              </div>
              
              {/* ACTION BUTTONS */}
              <div style={{ display: 'flex', gap: '5px' }}>
                <button 
                  onClick={() => handleToggleComplete(task._id, task.completed)}
                  style={{ padding: '6px 12px', backgroundColor: task.completed ? '#6c757d' : '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                >
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button 
                  onClick={() => handleDeleteTask(task._id)}
                  style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;