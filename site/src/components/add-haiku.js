import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import { useIdentityContext } from 'react-netlify-identity-widget';

const ADD_HAIKU = gql`
  mutation addHaiku(
    $title: String!
    $slug: String!
    $content: String!
    $netlifyID: String!
  ) {
    addHaiku(
      input: {
        title: $title
        slug: $slug
        content: $content
        netlifyID: $netlifyID
      }
    ) {
      id
    }
  }
`;

// Quick-and-dirty helper to convert strings into URL-friendly slugs.
const slugify = str =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const AddHaiku = () => {
  const identity = useIdentityContext();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');

  const addHaiku = useMutation(ADD_HAIKU, {
    variables: {
      content,
      title,
      slug,
      netlifyID: identity.user.id
    }
  });

  return (
    <>
      <h2>Add a Haiku</h2>
      <form
        onSubmit={event => {
          event.preventDefault();

          const mutationResult = addHaiku();

          console.log(mutationResult);
        }}
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={event => {
            setTitle(event.target.value);
            setSlug(slugify(event.target.value));
          }}
        />

        <label htmlFor="content">Haiku</label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={event => setContent(event.target.value)}
        />

        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default AddHaiku;
