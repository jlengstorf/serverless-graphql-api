import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';

export const query = graphql`
  {
    haiku {
      allHaiku {
        id
        title
        slug
        content
        author {
          name
        }
        snapCount
      }
    }
  }
`;

const Index = ({ data }) => (
  <Layout>
    {data.haiku.allHaiku.map(haiku => (
      <article key={haiku.id}>
        <h2>
          <Link to={`/${haiku.slug}`}>{haiku.title}</Link>
        </h2>
        <p dangerouslySetInnerHTML={{ __html: haiku.content }} />
        <footer>
          <p>By: {haiku.author.name}</p>
          <p>
            {haiku.snapCount} {haiku.snapCount === 1 ? 'snap' : 'snaps'}
          </p>
        </footer>
      </article>
    ))}
  </Layout>
);

export default Index;
