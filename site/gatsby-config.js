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
        url: 'http://localhost:8888/.netlify/functions/graphql'
      }
    }
  ]
};
