import React from 'react';
import { FiMenu } from 'react-icons/fi';

export default function Hamburger() {
  return (
    <div className="lg:hidden flex items-center justify-center">
      <button type="button">
        <FiMenu className="w-6 h-6" />
      </button>
    </div>
  );
}
