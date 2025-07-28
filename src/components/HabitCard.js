import { useState } from 'react';
import '../styles/habitCard.css';
import Swal from 'sweetalert2';

const HabitCard = ({ habit, onCheck, onEdit, onDelete, preview = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: habit.name, goal: habit.goal });

  const completedToday = habit.history?.some(
    (entry) => entry.date === new Date().toISOString().split('T')[0]
  );

  const handleSave = () => {
    if (!editForm.name.trim()) {
      Swal.fire('Habit name cannot be empty.');
      return;
    }

    if (editForm.name.length > 256) {
      Swal.fire('Habit name must be 256 characters or less.');
      return;
    }

    onEdit(habit._id, editForm.name, editForm.goal);
    setIsEditing(false);
  };

  return (
    <div className={`habit-card ${preview ? 'preview-card' : ''}`}>
      {isEditing ? (
        <div className="edit-form">
          <input
            maxLength={256}
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            placeholder="Habit name"
            disabled={preview}
          />
          <input
            type="number"
            value={editForm.goal}
            onChange={(e) => setEditForm({ ...editForm, goal: Number(e.target.value) })}
            placeholder="Goal (days)"
            disabled={preview}
          />
          <div className="card-buttons">
            <button onClick={handleSave} className="check" disabled={preview}>Save</button>
            <button onClick={() => setIsEditing(false)} className="delete" disabled={preview}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <h3>{habit.name}</h3>
          <p className="habit-details">Goal: {habit.goal} days</p>
          <p className="habit-details">Completed today: {completedToday ? '✅' : '❌'}</p>
          <div className="card-buttons">
            <button
              className="check"
              onClick={() => onCheck(habit._id)}
              disabled={completedToday || preview}
            >
              {completedToday ? 'Already Done' : 'Mark Complete'}
            </button>
            <button
              className="edit"
              onClick={() => setIsEditing(true)}
              disabled={preview}
            >
              Edit
            </button>
            <button
              className="delete"
              onClick={() => onDelete(habit._id)}
              disabled={preview}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HabitCard;
