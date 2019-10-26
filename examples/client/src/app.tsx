import { Button, Container, TextField } from '@material-ui/core';
import { Decoder, Encoder } from 'merkle-hellman';
import React from 'react';
import { Api } from './api';
import './app.less';
import { Loader, NotificationContainer } from './components';

interface IState {
  api: Api;
  decoder?: Decoder;
  encoder?: Encoder;
  message: string;
}

export class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);

    const api = new Api();

    this.state = {
      api,
      message: '',
    };
  }

  public async componentDidMount() {
    const { publicKey } = await this.state.api.getPublicKey();

    const decoder = new Decoder();
    const encoder = new Encoder(publicKey);

    this.setState({
      decoder,
      encoder,
    });
  }

  public onChange = (event: any) => {
    const { target: { name, value } } = event;

    this.setState({ [name]: value } as Pick<IState, keyof IState>);
  }

  public onClick = async () => {
    const { message, encoder, api } = this.state;
  }

  public render() {
    const { message, decoder, encoder } = this.state;

    if (!decoder || !encoder) {
      return <Loader />;
    }

    return <>
      <NotificationContainer />
      <Container
        className='messenger'
      >
        <TextField
          variant='outlined'
          label='Message'
          name='message'
          value={message}
          onChange={this.onChange}
          fullWidth
        />
        <Button
          className='send-button'
          color='primary'
          variant='contained'
        >
          Send message
      </Button>
      </Container>
    </>;
  }
}
