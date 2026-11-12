'use client';

import { useState } from 'react';
import Icon from '@/components/site/Icon';
import Button from '@/components/ui/Button';
import { NAV } from '@/lib/brand';
import s from './web-system.module.css';

// The app's chrome: the left icon rail (layers, link, headset, gear, folder, log-out, user) and the top tab strip.
const RAIL = [['layers', 'Layers'], ['link', 'Link'], ['headset', 'Support'], ['gear', 'Settings'], ['folder', 'Folders']];

export default function AppNav() {
  const [tab, setTab] = useState('Progress');
  const [rail, setRail] = useState('link');
  return (
    <div className={s.appFrame} data-screen="web-system-app-chrome">
      <div className={s.rail}>
        <div className={s.railGroup} role="group" aria-label="Rail">
          {RAIL.map(([name, label]) => (
            <button key={name} type="button" className={s.railBtn} aria-label={label} aria-pressed={rail === name} onClick={() => setRail(name)}>
              <Icon name={name} size={22} />
            </button>
          ))}
        </div>
        <div className={s.railGroup}>
          <button type="button" className={s.railBtn} aria-label="Log out"><Icon name="logout" size={22} /></button>
          <span className={s.avatarTile} role="img" aria-label="User"><Icon name="user" size={22} /></span>
        </div>
      </div>
      <div className={s.appMain}>
        <div className={s.topbar}>
          <nav className={s.appTabs} aria-label="App sections">
            {NAV.map((n) => (
              <button key={n} type="button" className={s.appTab} aria-current={tab === n ? 'page' : undefined} onClick={() => setTab(n)}>
                {n}
              </button>
            ))}
          </nav>
          <div className="row" style={{ gap: 6 }}>
            <Button variant="white" icon="briefcase" label="Projects" />
            <Button variant="white" icon="bell" label="Notifications" />
          </div>
        </div>
        <div className={s.appBars} aria-hidden="true">
          <span className="skeleton" />
          <span className="skeleton" />
          <span className="skeleton" />
        </div>
      </div>
    </div>
  );
}
