import { Messenger } from 'services';
import React from 'react';
import send from 'assets/send.png';
import './sendler.less';

interface IState {
  message: string;
}

interface IProps {
  messenger: Messenger;
}

export class Sendler extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      message: '',
    };
  }

  public onChange = (event: any) => {
    const { value: message } = event.target;

    this.setState({ message });
  };

  public onClick = () => {
    this.props.messenger.sendMessage(this.state.message);
    this.setState({ message: '' });
  };

  public render() {
    return <div className='sendler'>
      <input value={this.state.message} onChange={this.onChange} placeholder='Enter message' />
      <img src={send} onClick={this.onClick} />
    </div>;
  }
}
