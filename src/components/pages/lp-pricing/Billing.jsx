'use client';

import { createContext, useContext, useState } from 'react';

// One shared state for the page: the billing switch (hero and final call) and the picked plan
// (usage slider, matrix header and plan columns all follow it).
const Ctx = createContext(null);

// The usage slider has three stops, one per plan, named only by the plan bullets
// ("Track up to 20 tasks per month", "Track up to 200 tasks per month", "Unlimited task tracking").
export function BillingProvider({ children }) {
  const [billing, setBilling] = useState('Monthly');
  const [plan, setPlan] = useState(0);
  return <Ctx.Provider value={{ billing, setBilling, plan, setPlan }}>{children}</Ctx.Provider>;
}

export function useBilling() {
  return useContext(Ctx);
}
