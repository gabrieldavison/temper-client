import React from "react";
import { Link } from "@reach/router";

export default function Nav() {
  return (
    <ul>
      <li>
        <Link to="/new-entry">New Entry</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
    </ul>
  );
}