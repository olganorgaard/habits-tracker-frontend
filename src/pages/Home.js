import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { HabitFormContext } from '../context/HabitFormContext';
import habitService from '../services/habitService';
import Spinner from '../components/Spinner';
import gsap from 'gsap';
import { useRef, useLayoutEffect } from 'react';

import './styles/home.css';
import './styles/header.css';

const Home = () => {
  const headerRef = useRef(null);

  useLayoutEffect(() => {
  gsap.from(headerRef.current, {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  });
}, []);

  const { isLoading, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [habits, setHabits] = useState([]);
  const { setPrefill } = useContext(HabitFormContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: 'https://my-habit-tracker-api',
        });
        const data = await habitService.getHabits(token);
        setHabits(data);
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    };

    if (isAuthenticated) {
      fetchHabits();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) return <Spinner />;

  const completedTodayCount = habits.filter(habit =>
    habit.history.some(entry => entry.date === new Date().toISOString().split('T')[0])
  ).length;

  const suggestedHabits = [
    { name: '🚶 Walk 5,000 steps', goal: 7 },
    { name: '📖 Read 10 pages', goal: 7 },
    { name: '🧘 Meditate for 10 minutes', goal: 7 },
    { name: '💧 Drink 2L water', goal: 7 },
  ];

  const handleSuggestionClick = (habit) => {
    setPrefill(habit);
    navigate('/dashboard');
  };

  return (
    <div>
      <div className="header" ref={headerRef}>
        <h1>Habit Tracker</h1>
        <p>
          “Sow a thought, reap an action; sow an action, reap a habit; sow a habit,
          reap a character; sow a character, reap a destiny.” – <strong>Stephen R. Covey</strong>
        </p>
      </div>

      <div className="home-container">
        <h1 className="home-title">
          {isAuthenticated ? `Welcome, ${user.name}!` : 'Welcome!'}
        </h1>
        {!isAuthenticated && (
          <p className="home-message">
            Please log in to track your habits and monitor your progress. 
            Meanwhile, explore some habit ideas below and get inspired!
          </p>
        )}

        {isAuthenticated && (
          <div className="progress-section">
            <h2>Your Progress Snapshot</h2>
            <p><strong>Total Habits:</strong> {habits.length}</p>
            <p><strong>Completed Today:</strong> {completedTodayCount} ✅</p>
          </div>
        )}

        <div className="suggestions-section">
          <h2>Popular Habit Ideas</h2>
          {!isAuthenticated && (
            <p className="suggestion-intro">
              Even if you're not signed in, here are some healthy routines to consider building:
            </p>
          )}
          <ul className="habit-ideas">
            {suggestedHabits.map((habit, idx) => (
              <li key={idx} onClick={() => isAuthenticated && handleSuggestionClick(habit)}>
                {habit.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
