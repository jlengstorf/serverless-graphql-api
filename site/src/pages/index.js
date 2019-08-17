import React from 'react';
import { graphql, Link } from 'gatsby';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Layout from '../components/layout';

export const GATSBY_QUERY = graphql`
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

export const APOLLO_QUERY = gql`
  query {
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
`;

const Index = ({ data }) => {
  const { loading, error, data: apollo } = useQuery(APOLLO_QUERY);

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  const haikus = loading ? data.haiku.allHaiku : apollo.allHaiku;

  return (
    <Layout>
      {haikus.map(haiku => (
        <article key={haiku.id}>
          <h2>
            <Link to={`/${haiku.slug}`}>{haiku.title}</Link>
          </h2>
          <pre dangerouslySetInnerHTML={{ __html: haiku.content }} />
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
};

export default Index;
