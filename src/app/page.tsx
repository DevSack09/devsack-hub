import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black">
      <div className="text-center select-none">
        {/* Título principal usando Montserrat, tus colores personalizados y tracking estrecho */}
        <h1 className="font-primary font-bold text-6xl tracking-tighter sm:text-8xl">
          <span className="text-dev-blue">Dev</span>
          <span className="text-dev-green">.</span>
          <span className="text-white">Sack</span>
        </h1>
        
        {/* Subtítulo usando Poppins */}
        <p className="mt-6 font-secondary text-sm md:text-base tracking-widest text-neutral-400 uppercase">
          Ecosistema de Desarrollo Premium
        </p>
      </div>
    </main>
  );
}