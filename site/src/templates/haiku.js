import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';

export const query = graphql`
  query($id: ID!) {
    haiku {
      haiku(id: $id) {
        title
        content
        author {
          name
        }
        snaps {
          id
          user {
            name
          }
        }
      }
    }
  }
`;

const HaikuTemplate = ({
  data: {
    haiku: { haiku }
  }
}) => (
  <Layout>
    <article>
      <h1>{haiku.title}</h1>
      <p dangerouslySetInnerHTML={{ __html: haiku.content }} />
      <p>Posted by {haiku.author.name}</p>
      <ul>
        {haiku.snaps.map(snap => (
          <li key={snap.id}>{snap.user.name} snapped for this haiku</li>
        ))}
      </ul>
    </article>
    <Link to="/">&larr; back to all haikus</Link>
  </Layout>
);

export default HaikuTemplate;
