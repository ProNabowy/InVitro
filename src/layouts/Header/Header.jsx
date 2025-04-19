import React from "react";
import { Link } from "react-router-dom";

/**
 * The site header component.
 *
 * @returns {JSX.Element} The header HTML.
 *
 * @example
 * <Header />
 */
export default function Header() {
  return (
    <header className="shadow-[0px_1px_5px_0px_rgba(0,_42,_73,_0.15)] bg-white">
      <div className="container relative flex items-center justify-between h-[70px] sm:h-[90px]">
        <img
          src="/images/logo.webp"
          className="w-fit h-[50px] sm:h-[70px] hidden sm:block"
          alt="Company logo"
        />
        <img
          src="/logo.png"
          className="w-fit h-[50px] sm:hidden"
          alt="Company logo"
        />

        <ul
          role="navigation"
          aria-label="Main navigation"
          className="flex items-center gap-4"
        >
          <li>
            <Link
              to={"/"}
              className="font-medium text-sm sm:text-[18px] transition hover:text-primary"
              role="link"
              aria-label="Find doctors page"
            >
              Find doctors
            </Link>
          </li>
          <li>
            <Link
              to={"/appointments"}
              className="font-medium text-sm sm:text-[18px] transition hover:text-primary"
              role="link"
              aria-label="Appointments page"
            >
              Appointments
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
