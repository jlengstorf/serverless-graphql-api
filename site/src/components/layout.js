import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { gql } from 'apollo-boost';
import IdentityModal, {
  useIdentityContext
} from 'react-netlify-identity-widget';
import AddHaiku from './add-haiku';
import { useMutation } from '@apollo/react-hooks';

const ADD_USER = gql`
  mutation($netlifyID: ID!, $name: String!) {
    addUser(input: { netlifyID: $netlifyID, name: $name }) {
      id
    }
  }
`;

const Layout = ({ children }) => {
  const [netlifyID, setNetlifyID] = useState(false);
  const [name, setName] = useState('');
  const [addUser, { data }] = useMutation(ADD_USER, {
    variables: { netlifyID, name }
  });
  const identity = useIdentityContext();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (identity.user && identity.user.id && identity.user.user_metadata) {
      async function updateUser() {
        await addUser();

        console.log(data);
      }
      setNetlifyID(identity.user.id);
      setName(identity.user.user_metadata.full_name);

      if (!netlifyID || !name) {
        return;
      }

      updateUser();
    }
  }, [identity]);

  return (
    <>
      <header>
        <Link to="/">
          You know that I could use somebody... <em>Someone haiku!</em>
        </Link>
        {identity && identity.isLoggedIn ? (
          <>
            <p>Logged in!</p>
            <AddHaiku />
          </>
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
