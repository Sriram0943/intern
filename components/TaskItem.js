import { useState } from 'react';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleUpdate = () => {
    onUpdate(task.id, { title, description, lastUpdated: new Date().toISOString() });
    setIsEditing(false);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <div>
          <p></p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p></p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p></p>
          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <small>Last updated: {new Date(task.lastUpdated).toLocaleString()}</small>
          <p></p>
          <button className="delete" onClick={() => onDelete(task.id)}>Delete</button>
          <button className="edit" onClick={() => setIsEditing(true)}>Edit</button>
          <button className="complete" onClick={() => onUpdate(task.id, { completed: !task.completed })}>
            {task.completed ? 'Undo' : 'Complete'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
