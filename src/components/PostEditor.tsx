import React from 'react';
import gql from 'graphql-tag';
import { Form as FinalForm, Field } from 'react-final-form';
import client from '../apollo';
import { GET_POSTS } from './PostViewer';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Button';

const SUBMIT_POST = gql`
  mutation SubmitPost($input: PostInput!) {
    submitPost(input: $input) {
      id
    }
  }
`;

const PostEditor = ({ post, onClose }: any) => (
  <FinalForm
    onSubmit={async ({ id, car, manufacturer }: any) => {
      const input = { id, car, manufacturer };

      await client.mutate({
        variables: { input },
        mutation: SUBMIT_POST,
        refetchQueries: () => [{ query: GET_POSTS }],
      });

      onClose();
    }}
    initialValues={post}
    render={({ handleSubmit, pristine, invalid }) => (
      <Modal>
        <form onSubmit={handleSubmit}>
          <div>{post.id ? 'Edit Post' : 'New Post'}</div>
          <div>
            <div>
              <label>Car</label>
              <Field
                required
                name="car"
                className="form-control"
                component="input"
                autocomplete="off"
              />
            </div>
            <div>
              <label>Manufacturer</label>
              <Field
                required
                name="manufacturer"
                className="form-control"
                component="input"
                autocomplete="off"
              />
            </div>
          </div>
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={pristine}
            >
              Save
            </Button>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    )}
  />
);

export default PostEditor;
