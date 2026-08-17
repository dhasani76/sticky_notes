import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright © {currentYear} Sticky Notes App. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
