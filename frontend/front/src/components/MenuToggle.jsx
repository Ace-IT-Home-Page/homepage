// src/components/MenuToggle.js
import React from 'react';
import { motion } from 'framer-motion';

export const MenuToggle = ({ isOpen, toggle }) => {
  const variant = isOpen ? 'opened' : 'closed';

  return (
    <button onClick={toggle} className={`menu-toggle ${isOpen ? 'menu-open' : ''}`}>
      <svg width="23" height="18" viewBox="0 0 23 23">
        <motion.path
          className="top"
          fill="transparent"
          strokeWidth="2"
          stroke="#000"
          strokeLinecap="round"
          animate={variant}
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            opened: { d: 'M 3 16.5 L 17 2.5' },
          }}
        />
        <motion.path
          className="middle"
          fill="transparent"
          strokeWidth="2"
          stroke="#000"
          strokeLinecap="round"
          d="M 2 9.423 L 20 9.423"
          animate={variant}
          variants={{
            closed: { opacity: 1 },
            opened: { opacity: 0 },
          }}
        />
        <motion.path
          className="bottom"
          fill="transparent"
          strokeWidth="2"
          stroke="#000"
          strokeLinecap="round"
          animate={variant}
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            opened: { d: 'M 3 2.5 L 17 16.346' },
          }}
        />
      </svg>
    </button>
  );
};
