'use client';

import { createContext, useContext, useState } from 'react';

// One shared state for the page: the billing switch (hero and final call) and the usage slider
// (slider, matrix header and plan columns all follow it).
const Ctx = createContext(null);

export const MAX_TASKS = 400;
// The case study's own thresholds: up to 20 tasks is Basic, up to 200 is Standard, above that Premium.
export const planFor = (tasks) => (tasks <= 20 ? 0 : tasks <= 200 ? 1 : 2);
export const SAMPLE_TASKS = [20, 200, 300];

export function BillingProvider({ children }) {
  const [billing, setBilling] = useState('Monthly');
  const [tasks, setTasks] = useState(20);
  return <Ctx.Provider value={{ billing, setBilling, tasks, setTasks, plan: planFor(tasks) }}>{children}</Ctx.Provider>;
}

export function useBilling() {
  return useContext(Ctx);
}
