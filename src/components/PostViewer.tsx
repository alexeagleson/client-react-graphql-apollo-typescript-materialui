import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
        <TableHead>
          <TableRow>
            <TableCell>Author</TableCell>
            <TableCell>Body</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.posts.map((post: any) => (
            <TableRow
              key={post.id}
              style={rowStyles(post, canEdit)}
              onClick={() => canEdit(post) && onEdit(post)}
            >
              <TableCell>{post.author}</TableCell>
              <TableCell>{post.body}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )}
  </Query>
);

PostViewer.defaultProps = {
  canEdit: () => false,
  onEdit: () => null,
};

export default PostViewer;
