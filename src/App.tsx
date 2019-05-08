import React, { Component } from 'react';
import Dashboard from './views/Dashboard';
import PostViewer from './components/PostViewer';
import PostEditor from './components/PostEditor';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import './assets/styles/main.css';
const logo = require('./assets/images/logo.svg');

class App extends Component {
  public state = {
    viewMode: 1,
    editing: null,
  };

  public render() {
    const { viewMode, editing } = this.state;

    if (viewMode === 1) {
      return (
        <Grid container>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => this.setState({ viewMode: 2 })}
            >
              GraphQL!
            </Button>
          </Grid>
          <Grid item xs={8}>
            <Dashboard />
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => this.setState({ viewMode: 1 })}
            >
              Back to the Dashboard!
            </Button>
          </Grid>

          <Grid item xs={12}>
            <img src={logo} className="App-logo" alt="logo" />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.setState({ editing: {} })}
            >
              New Post
            </Button>
          </Grid>
          <Grid item xs={12}>
            <h3>(or click to edit an existing entry)</h3>
          </Grid>

          <Grid item xs={12}>
            <PostViewer
              canEdit={() => true}
              onEdit={(post: any) => this.setState({ editing: post })}
            />
            {editing && (
              <PostEditor
                post={editing}
                onClose={() => this.setState({ editing: null })}
              />
            )}
          </Grid>
        </Grid>
      );
    }
  }
}

export default App;
