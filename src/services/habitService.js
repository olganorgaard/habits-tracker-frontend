
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const getHabits = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const addHabit = async (token, name, goal) => {
  await axios.post(
    API_URL,
    { name, goal },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

const markComplete = async (token, habitId) => {
  await axios.post(
    `${API_URL}/${habitId}/check`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

const updateHabit = async (token, id, name, goal) => {
  await axios.put(
    `${API_URL}/${id}`,
    { name, goal },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

const deleteHabit = async (token, id) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const habitService = {
  getHabits,
  addHabit,
  markComplete,
  updateHabit,
  deleteHabit,
};

export default habitService;
