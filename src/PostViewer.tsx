import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Table } from 'reactstrap';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      author
      body
    }
  }
`;

const rowStyles = (post: any, canEdit: any) => {
  const styles: React.CSSProperties = { cursor: 'pointer', fontWeight: 'bold' };
  return canEdit(post) ? styles : {};
};

const PostViewer = ({ canEdit, onEdit }: any) => (
  <Query query={GET_POSTS}>
    {({ loading, data }: any) => !loading && (
      <Table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {data.posts.map((post: any) => (
            <tr
              key={post.id}
              style={rowStyles(post, canEdit)}
              onClick={() => canEdit(post) && onEdit(post)}
            >
              <td>{post.author}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </Query>
);

PostViewer.defaultProps = {
  canEdit: () => false,
  onEdit: () => null,
};

export default PostViewer;

// import React from 'react';
// import gql from 'graphql-tag';
// import { Query } from 'react-apollo';
// // import { Table } from 'reactstrap';

// export const GET_POSTS = gql`
//   query GetPosts {
//     posts {
//       id
//       author {
//         id
//         name
//       }
//       body
//     }
//   }
// `;

// const rowStyles = (post: any, canEdit: any) => {
//   const styles: React.CSSProperties = { cursor: 'pointer', fontWeight: 'bold' };
//   return canEdit(post) ? styles : {};
// };

// const PostViewer = () => (
//   <Query query={GET_POSTS}>
//     {({ loading, data }: any) => !loading && (
//       <table>
//         <thead>
//           <tr>
//             <th>Author</th>
//             <th>Body</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.posts.map((post: any) => (
//             <tr key={post.id}>
//               <td>{post.author}</td>
//               <td>{post.body}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     )}
//   </Query>
// );

// // const PostViewer = ({ canEdit, onEdit }: any) => (
// //   <Query query={GET_POSTS}>
// //     {({ loading, data }: any) =>
// //       !loading && (
// //         <Table>
// //           <thead>
// //             <tr>
// //               <th>Author</th>
// //               <th>Body</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {data.posts.map((post: any) => (
// //               <tr
// //                 key={post.id}
// //                 style={rowStyles(post, canEdit)}
// //                 onClick={() => canEdit(post) && onEdit(post)}
// //               >
// //                 <td>{post.author.name}</td>
// //                 <td>{post.body}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </Table>
// //       )
// //     }
// //   </Query>
// // );

// // PostViewer.defaultProps = {
// //   canEdit: () => false,
// //   onEdit: () => null,
// // };

// export default PostViewer;
