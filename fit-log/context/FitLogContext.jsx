'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const FitLogContext = createContext(null);
const PLAN_KEY = 'fitlog-plan';
const SAVED_KEY = 'fitlog-saved';

export function FitLogProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    try {
      const storedPlan = JSON.parse(localStorage.getItem(PLAN_KEY) || '[]');
      const storedSaved = JSON.parse(localStorage.getItem(SAVED_KEY) || '[]');
      setPlan(Array.isArray(storedPlan) ? storedPlan : []);
      setSaved(Array.isArray(storedSaved) ? storedSaved : []);
    } catch {
      setPlan([]);
      setSaved([]);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  function notify(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2200);
  }

  function addToPlan(workout) {
    let added = false;
    setPlan(current => {
      if (current.length >= 5 || current.some(item => String(item.id) === String(workout.id))) return current;
      added = true;
      return [...current, { ...workout, done: false }];
    });
    return added;
  }

  function removeFromPlan(id) {
    setPlan(current => current.filter(item => String(item.id) !== String(id)));
  }

  function markDone(id) {
    setPlan(current => current.map(item => String(item.id) === String(id) ? { ...item, done: true } : item));
  }

  function saveForLater(workout) {
    setSaved(current => current.some(item => String(item.id) === String(workout.id)) ? current : [...current, workout]);
  }

  function removeFromSaved(id) {
    setSaved(current => current.filter(item => String(item.id) !== String(id)));
  }

  const metrics = useMemo(() => ({
    exercises: plan.length,
    minutes: plan.reduce((sum, item) => sum + Number(item.duration || 0), 0),
    calories: plan.reduce((sum, item) => sum + Number(item.calories || item.caloriesBurned || 0), 0)
  }), [plan]);

  return (
    <FitLogContext.Provider value={{
      plan, saved, hydrated, metrics, toast, notify,
      addToPlan, removeFromPlan, markDone, saveForLater, removeFromSaved
    }}>
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const value = useContext(FitLogContext);
  if (!value) throw new Error('useFitLog must be used inside FitLogProvider');
  return value;
}
