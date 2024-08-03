import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export async function getServerSideProps(context) {
  const res = await fetch('http://localhost:3000/tasks.json');
  const initialTasks = await res.json();
  return { props: { initialTasks } };
}

const Home = ({ initialTasks }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState('');

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: tasks.length + 1,
      completed: false,
      lastUpdated: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Todo List</h1>
      <input
        type="search"
        placeholder="Search tasks"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TaskForm onAdd={addTask} />
      <TaskList tasks={filteredTasks} onUpdate={updateTask} onDelete={deleteTask} />
    </div>
  );
};

export default Home;
