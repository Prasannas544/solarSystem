// app/components/TimerDemo.js
'use client';

import { useEffect, useRef } from 'react';
import { createTimer, utils } from 'animejs';

export default function TimerDemo() {
  const pausedRef = useRef(null);
  const timeRef = useRef(null);
  const resumeButtonRef = useRef(null);
  const pauseButtonRef = useRef(null);
  const pausedCount = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    // Initialize timer
    timerRef.current = createTimer({
      onPause: () => {
        pausedCount.current++;
        if (pausedRef.current) pausedRef.current.textContent = pausedCount.current;
      },
      onUpdate: (self) => {
        if (timeRef.current) timeRef.current.textContent = self.currentTime.toFixed(2);
      }
    });

    // Set up event listeners
    const resumeTimer = () => timerRef.current.resume();
    const pauseTimer = () => timerRef.current.pause();

    const resumeBtn = resumeButtonRef.current;
    const pauseBtn = pauseButtonRef.current;

    if (resumeBtn) resumeBtn.addEventListener('click', resumeTimer);
    if (pauseBtn) pauseBtn.addEventListener('click', pauseTimer);

    // Cleanup
    return () => {
      if (resumeBtn) resumeBtn.removeEventListener('click', resumeTimer);
      if (pauseBtn) pauseBtn.removeEventListener('click', pauseTimer);
      if (timerRef.current) timerRef.current.stop();
    };
  }, []);

  return (
    <div className="timer-container">
      <div className="large row">
        <div className="col">
          <pre className="large log row">
            <span className="label">paused</span>
            <span className="value paused" ref={pausedRef}>0</span>
          </pre>
        </div>
        <div className="col">
          <pre className="large log row">
            <span className="label">elapsed time</span>
            <span className="time value lcd" ref={timeRef}>0</span>
          </pre>
        </div>
      </div>
      <div className="medium row">
        <fieldset className="controls">
          <button className="button" ref={resumeButtonRef}>Resume</button>
          <button className="button" ref={pauseButtonRef}>Pause</button>
        </fieldset>
      </div>
    </div>
  );
}