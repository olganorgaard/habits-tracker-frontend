import { createContext, useState } from 'react';

export const HabitFormContext = createContext();

export const HabitFormProvider = ({ children }) => {
  const [prefill, setPrefill] = useState(null);
  return (
    <HabitFormContext.Provider value={{ prefill, setPrefill }}>
      {children}
    </HabitFormContext.Provider>
  );
};
