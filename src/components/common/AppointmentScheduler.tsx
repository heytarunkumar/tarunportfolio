import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';

declare global {
  interface Window {
    calendar?: {
      schedulingButton?: {
        load: (options: {
          url: string;
          color: string;
          label: string;
          target: HTMLElement;
        }) => void;
      };
    };
  }
}

export const AppointmentScheduler: React.FC = () => {
  const location = useLocation();
  const { scheduler } = usePortfolio();
  const targetRef = useRef<HTMLDivElement>(null);
  const customContainerRef = useRef<HTMLDivElement>(null);

  const isAdmin = location.pathname.startsWith('/admin');

  // Helper to remove any floating scheduler button elements
  const removeFloatingButtons = () => {
    const existingButtons = document.querySelectorAll('.qxCTlb');
    existingButtons.forEach((btn) => btn.remove());
    const existingModals = document.querySelectorAll('.hur54b');
    existingModals.forEach((modal) => modal.remove());
  };

  useEffect(() => {
    // If we are on an admin route or the scheduler is disabled in CMS,
    // ensure no floating button or modal exists in the DOM.
    if (isAdmin || !scheduler.enabled) {
      removeFloatingButtons();
      return;
    }

    if (scheduler.mode === 'custom') {
      removeFloatingButtons();
      if (customContainerRef.current && scheduler.customCode) {
        customContainerRef.current.innerHTML = '';
        // Parse and safely evaluate scripts in custom code
        const range = document.createRange();
        range.selectNode(customContainerRef.current);
        const fragment = range.createContextualFragment(scheduler.customCode);
        customContainerRef.current.appendChild(fragment);
      }
      return;
    }

    // Standard Google Calendar mode:
    // 1. Ensure Google Calendar stylesheet is loaded
    const cssId = 'google-calendar-scheduling-css';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.href = 'https://calendar.google.com/calendar/scheduling-button-script.css';
      document.head.appendChild(link);
    }

    // 2. Ensure Google Calendar script is loaded
    const scriptId = 'google-calendar-scheduling-js';
    const initScheduler = () => {
      if (isAdmin || !scheduler.enabled) return;
      if (!targetRef.current) return;

      if (window.calendar && window.calendar.schedulingButton) {
        // Clear previous buttons inside target
        targetRef.current.innerHTML = '';
        window.calendar.schedulingButton.load({
          url: scheduler.url,
          color: scheduler.color || '#039BE5',
          label: scheduler.label || 'Book an appointment',
          target: targetRef.current,
        });

        // Apply position override if needed
        setTimeout(() => {
          const btn = targetRef.current?.querySelector('.qxCTlb') as HTMLElement | null;
          if (btn) {
            if (scheduler.position === 'bottom-left') {
              btn.style.left = '24px';
              btn.style.right = 'auto';
            } else {
              btn.style.right = '24px';
              btn.style.left = 'auto';
            }
          }
        }, 50);
      } else {
        setTimeout(initScheduler, 100);
      }
    };

    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
      script.async = true;
      script.onload = () => initScheduler();
      document.body.appendChild(script);
    } else {
      initScheduler();
    }

    return () => {
      removeFloatingButtons();
    };
  }, [isAdmin, scheduler.enabled, scheduler.url, scheduler.color, scheduler.label, scheduler.position, scheduler.mode, scheduler.customCode]);

  // If in admin mode or disabled, render nothing
  if (isAdmin || !scheduler.enabled) {
    return null;
  }

  if (scheduler.mode === 'custom') {
    return <div ref={customContainerRef} className="custom-scheduler-container" />;
  }

  return (
    <div
      ref={targetRef}
      id="google-calendar-scheduling-portal"
      aria-hidden="true"
    />
  );
};

export default AppointmentScheduler;
