require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'Haiku',
        fieldName: 'haiku',
        url: `${process.env.NETLIFY_FUNCTIONS_URL}/.netlify/functions/graphql`
      }
    }
  ]
};
