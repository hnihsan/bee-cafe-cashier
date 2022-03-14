import React from 'react';

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="bg-gray-100 body-font py-5 shadow-md sticky">
      <div className="container flex items-center justify-center">
        <span className="text-xl">Bee Cafe</span>
      </div>
    </header>
  );
}
