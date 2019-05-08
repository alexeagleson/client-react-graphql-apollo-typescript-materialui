import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

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
      <table>
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
      </table>
    )}
  </Query>
);

PostViewer.defaultProps = {
  canEdit: () => false,
  onEdit: () => null,
};

export default PostViewer;
