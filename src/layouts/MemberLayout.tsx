import React from 'react';
import HeadComponent from '../components/HeadComponent';

interface IMemberLayoutProps {
  children: JSX.Element;
  title: string;
}

export default function MemberLayout({ title, children }: IMemberLayoutProps) {
  return (
    <>
      <HeadComponent title={title} />
      <div className="relative">
        {/* HEADER */}
        {/* CONTENT */}
        <div>{children}</div>
        {/* FOOTER */}
      </div>
    </>
  );
}
