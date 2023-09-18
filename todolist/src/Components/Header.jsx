import React from "react";

function Header() {
  return (
    <header className="header">
      <div className="main_logo">
        <div className="greet">Здравствуйте, {window.localStorage.getItem('name')}</div>
        <div className="motivation">Быть сегодня лучше, чем вчера</div>
      </div>
    </header>
  );
}

export default Header;
