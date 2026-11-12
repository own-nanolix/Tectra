'use client';
// The pin-board: posts 2 x 2, posters as a tall trio, stories as a strip, the profile grid in a phone-width column,
// and the poster mockup. "Replay" re-mounts the board so every entrance and every in-artwork animation plays again.
import { useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { listV, itemV } from '@/lib/motion';
import { PostBuild, PostInsight, PostQuote, PostEfficiency } from './Posts';
import { PosterBuild, PosterSmart, PosterEmpower, PosterMock } from './Posters';
import { StorySmart, StoryInsights, StoryResults, StoryQuote, StoryPalm } from './Stories';
import ProfileGrid from './Grid';
import s from './campaign.module.css';

function Group({ cls, children }) {
  return (
    <motion.div className={cls} variants={listV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
      {children}
    </motion.div>
  );
}

function Item({ label, children, cls }) {
  return (
    <motion.figure className={`${s.item} ${cls || ''}`} variants={itemV} whileHover={{ y: -4 }}>
      {children}
      <figcaption className={s.cap}>{label}</figcaption>
    </motion.figure>
  );
}

export default function Board() {
  const [run, setRun] = useState(0);
  return (
    <MotionConfig reducedMotion="user">
      <div className={s.bar}>
        <button type="button" className="btn btn-dark btn-sm" onClick={() => setRun((n) => n + 1)}>Replay</button>
      </div>
      <div className={s.board} key={run}>
        <div className={s.top}>
          <section aria-labelledby="campaign-h-posts">
            <h2 id="campaign-h-posts" className={s.h}>Posts</h2>
            <Group cls={s.posts}>
              <Item label="Post 1"><PostBuild /></Item>
              <Item label="Post 2"><PostInsight /></Item>
              <Item label="Post 3"><PostQuote /></Item>
              <Item label="Post 4"><PostEfficiency /></Item>
            </Group>
          </section>
          <section aria-labelledby="campaign-h-posters">
            <h2 id="campaign-h-posters" className={s.h}>Posters</h2>
            <Group cls={s.posters}>
              <Item label="Poster 1"><PosterBuild /></Item>
              <Item label="Poster 2"><PosterSmart /></Item>
              <Item label="Poster 3"><PosterEmpower /></Item>
            </Group>
          </section>
        </div>

        <section aria-labelledby="campaign-h-stories" className={s.block}>
          <h2 id="campaign-h-stories" className={s.h}>Stories</h2>
          <Group cls={s.stories}>
            <Item label="Story 1"><StorySmart /></Item>
            <Item label="Story 2"><StoryInsights /></Item>
            <Item label="Story 3"><StoryResults /></Item>
            <Item label="Story 4"><StoryQuote /></Item>
            <Item label="Story 5"><StoryPalm /></Item>
          </Group>
        </section>

        <div className={`${s.block} ${s.low}`}>
          <section aria-labelledby="campaign-h-mock">
            <h2 id="campaign-h-mock" className={s.h}>Poster mockup</h2>
            <Group cls={s.mockWrap}>
              <Item label="Print and frame" cls={s.mockItem}><div className="mock"><PosterMock /></div></Item>
            </Group>
          </section>
          <section aria-labelledby="campaign-h-grid">
            <h2 id="campaign-h-grid" className={s.h}>Profile grid</h2>
            <Group cls={s.gridWrap}>
              <Item label="Profile grid"><ProfileGrid /></Item>
            </Group>
          </section>
        </div>
      </div>
    </MotionConfig>
  );
}
