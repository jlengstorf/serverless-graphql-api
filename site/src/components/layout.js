import React, { useState } from 'react';
import { Link } from 'gatsby';
import IdentityModal, {
  useIdentityContext
} from 'react-netlify-identity-widget';

const Layout = ({ children }) => {
  const identity = useIdentityContext();
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <header>
        <Link to="/">
          You know that I could use somebody... <em>Someone haiku!</em>
        </Link>
        {identity && identity.isLoggedIn ? (
          <p>Logged in!</p>
        ) : (
          <button onClick={() => setShowDialog(true)}>log in</button>
        )}
        <IdentityModal
          showDialog={showDialog}
          onCloseDialog={() => setShowDialog(false)}
        />
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
