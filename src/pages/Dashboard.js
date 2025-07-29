import { useEffect, useState, useCallback, useContext, useRef, useLayoutEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import habitService from '../services/habitService';
import HabitCard from '../components/HabitCard';
import Spinner from '../components/Spinner';
import './styles/dashboard.css';
import './styles/header.css';
import Swal from 'sweetalert2';
import { HabitFormContext } from '../context/HabitFormContext';
import gsap from 'gsap';

const Dashboard = () => {
  const { user, getAccessTokenSilently, isAuthenticated, loginWithRedirect } = useAuth0();
  const [habits, setHabits] = useState([]);
  const [form, setForm] = useState({ name: '', goal: 1 });
  const [loading, setLoading] = useState(true);
  const { prefill, setPrefill } = useContext(HabitFormContext);
  const listRef = useRef(null);

  const fetchHabits = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently({
        audience: 'https://my-habit-tracker-api',
      });
      const data = await habitService.getHabits(token);
      setHabits(data);
    } catch (err) {
      console.error('Error fetching habits:', err);
    } finally {
      setLoading(false);
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    if (isAuthenticated) fetchHabits();
  }, [isAuthenticated, fetchHabits]);

  useEffect(() => {
    if (prefill) {
      setForm({ name: prefill.name, goal: prefill.goal });
      setPrefill(null);
    }
  }, [prefill, setPrefill]);

  const handleAdd = async () => {
    if (!form.name.trim()) {
      Swal.fire('Habit name cannot be empty.');
      return;
    }
    if (form.name.length > 256) {
      Swal.fire('Habit name must be 256 characters or less.');
      return;
    }
    const token = await getAccessTokenSilently({
      audience: 'https://my-habit-tracker-api',
    });
    await habitService.addHabit(token, form.name, form.goal);
    setForm({ name: '', goal: 1 });
    fetchHabits();
  };

  const handleCheck = async (id) => {
    const token = await getAccessTokenSilently({
      audience: 'https://my-habit-tracker-api',
    });
    await habitService.markComplete(token, id);
    fetchHabits();
  };

  const handleEdit = async (id, name, goal) => {
    const token = await getAccessTokenSilently({
      audience: 'https://my-habit-tracker-api',
    });
    await habitService.updateHabit(token, id, name, goal);
    fetchHabits();
  };

  const handleDelete = async (id) => {
    const token = await getAccessTokenSilently({
      audience: 'https://my-habit-tracker-api',
    });
    await habitService.deleteHabit(token, id);
    fetchHabits();
  };

  useLayoutEffect(() => {
    if (habits.length > 0 && listRef.current) {
      gsap.from(listRef.current.children, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
      });
    }
  }, [habits]);

  // UI for unauthorized users
  if (!isAuthenticated) {
    return (
      <div className="dashboard-container">
        <div className="header">
          <h1>Welcome to Your Habit Dashboard</h1>
          <p>Log in to start tracking and building your habits with ease.</p>
        </div>

        <div className="guest-preview">
          <h2>Why use Habit Tracker?</h2>
          <ul className="benefits-list">
            <li>✅ Track your daily habits</li>
            <li>📊 Visualize your consistency</li>
            <li>📝 Set and edit personalized goals</li>
            <li>🎯 Build lasting routines</li>
          </ul>

          <button className="login-cta-button" onClick={() => loginWithRedirect()}>
            Log In or Sign Up
          </button>

          <h3 className="preview-title">Example Habits:</h3>
          <div className="habit-list">
            <HabitCard habit={{ name: '💧 Drink Water', goal: 7, history: [] }} preview />
            <HabitCard habit={{ name: '📖 Read 10 Pages', goal: 5, history: [] }} preview />
            <HabitCard habit={{ name: '🚶 Walk 5,000 Steps', goal: 6, history: [] }} preview />
          </div>
        </div>
      </div>
    );
  }

  if (loading) return <Spinner />;

  // UI for authorized users
  return (
    <div>
      <div className="header">
        <h1>Habit Dashboard</h1>
        <p>Track your daily routines and build consistency</p>
      </div>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>{user.name}'s Habit Tracker</h2>
          <blockquote>
            “Success is the product of daily habits—not once-in-a-lifetime transformations.”
            <strong> – James Clear, Atomic Habits</strong>
          </blockquote>
        </div>
        <div className="habit-card">
          <div className="habit-form">
            <input
              placeholder="Habit name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Goal (days)"
              value={form.goal}
              onChange={(e) => setForm({ ...form, goal: Number(e.target.value) })}
            />
            <button onClick={handleAdd}>Add Habit</button>
          </div>

          <div className="habit-list" ref={listRef}>
            {habits.length === 0 ? (
              <p className="empty-message">No habits yet. Add one above!</p>
            ) : (
              habits.map((habit) => (
                <HabitCard
                  key={habit._id}
                  habit={habit}
                  onCheck={handleCheck}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
