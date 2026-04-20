import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Header({ items }) {
  const [isOpen, setIsOpen] = useState(false);

  const onNavigate = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <button type="button" className="brand" onClick={() => onNavigate('inicio')}>
          <span className="brand-logo" aria-hidden="true">
            <img src="/images/logoPortfolio.svg" alt="" />
          </span>
          Christopher <span>Paucar</span>
        </button>

        <nav className={`nav ${isOpen ? 'open' : ''}`}>
          {items.map((item) => (
            <button key={item.id} type="button" onClick={() => onNavigate(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Abrir menú"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </header>
  );
}
