import React from "react";

function Footer() {
  return (
    <footer className="footer sm:footer-horizontal text-neutral-content items-center p-4">
      <aside className="grid-flow-col items-center">
        <p>Copyright © {new Date().getFullYear()} </p>
      </aside>
    </footer>
  );
}
export default Footer;
