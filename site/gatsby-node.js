// exports.createPages = async ({ actions, graphql, reporter }) => {
//   const result = await graphql(`
//     {
//       haiku {
//         allHaiku {
//           id
//           slug
//         }
//       }
//     }
//   `);

//   if (result.errors) {
//     reporter.panic('couldn’t load haikus!', result.errors);
//     return;
//   }

//   const haikus = result.data.haiku.allHaiku;

//   haikus.forEach(haiku => {
//     const pathname = `/${haiku.slug}`;
//     actions.createPage({
//       path: pathname,
//       component: require.resolve('./src/templates/haiku.js'),
//       context: {
//         id: haiku.id,
//         pathname
//       }
//     });
//   });
// };
