import React from "react";
import { Link } from "react-router-dom";

function Button({ type, children, disabled, to, onClick }) {
  const base =
    " inline-block text-sm rounded-full bg-yellow-400  font-semibold uppercase tracking-wide text-stone-800 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring transition-colors duration-300  focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed ";
  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    secondary:
      " inline-block rounded-full bg-stone-200  font-semibold uppercase text-stone-500 hover:text-stone-800 focus:text-stone-800 transition-colors hover:bg-stone-300  focus:bg-stone-300 focus:text-stone-800   focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:py-3.5 ",
    round: base + `  text-sm px-2 py-1.5 md:px-4 md:py-2`,
  };
  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  if (onClick)
    return (
      <button onClick={onClick} to={to} className={styles[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
