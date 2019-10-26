import { CircularProgress, Container } from '@material-ui/core';
import React from 'react';
import './loader.less';

export class Loader extends React.Component {
  public render() {
    return <Container className='ui loader'>
      <CircularProgress />
      <Container className='text' >Loading...</Container>
    </Container>;
  }
}
