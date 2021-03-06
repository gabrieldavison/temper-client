import React from "react";
import { Link, useLocation, navigate } from "@reach/router";
import client from "../utils/feathers";
import { css } from "emotion";
import { colors } from "../utils/colors";

const navBar = css`
  ul {
    padding: 0;
  }
  div {
    display: inline-block;
    width: 50%;
  }
  div:nth-of-type(2) {
    text-align: right;
  }
`;

const navItem = css`
  &--unselected,
  &--selected {
    display: inline-block;
    a {
      font-size: 1.5em;
      text-decoration: none;
      margin-right: 1em;
    }
    a:hover {
      text-decoration: underline;
    }
  }
  &--unselected {
    a {
      color: black;
    }
  }
  &--selected {
    a {
      color: ${colors.accent};
    }
  }
`;
const navButton = css`
  display: inline-block;
  border: none;
  padding: 0;
  margin: 0;
  text-decoration: none;
  background-color: inherit;
  font-size: 1.5em;
  :hover {
    text-decoration: underline;
  }
`;
const navItem__unselected = navItem + "--unselected";

const navItem__selected = navItem + "--selected";

export default function Nav(props) {
  function logout() {
    client.logout().then(navigate("/login"));
  }
  const location = useLocation();

  return (
    <nav className={navBar}>
      <ul>
        <div>
          <li
            className={
              location.pathname === "/new-entry"
                ? navItem__selected
                : navItem__unselected
            }
          >
            <Link to="/new-entry">New Entry</Link>
          </li>
          <li
            className={
              location.pathname === "/dashboard"
                ? navItem__selected
                : navItem__unselected
            }
          >
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li
            className={
              location.pathname === "/visualize"
                ? navItem__selected
                : navItem__unselected
            }
          >
            <Link to="/visualize">Visualize</Link>
          </li>
        </div>
        <div>
          <li className={navItem__unselected}>
            <button className={navButton} onClick={logout}>
              Log Out
            </button>
          </li>
        </div>
      </ul>
    </nav>
  );
}
