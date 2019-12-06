import { Messenger } from 'services';
import { Messages, Nickname, Sendler } from 'components';
import React, { ChangeEvent } from 'react';
import './terminal.less';

interface IState {
  nickname: string | undefined;
  messenger: Messenger | undefined;
}

export class Terminal extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      nickname: undefined,
      messenger: undefined,
    };
  }

  public onChangeNickname = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: nickname } = event.currentTarget as any;

    this.setState({ nickname });
  };

  public onClickNickname = async () => {
    const { nickname } = this.state;

    const messenger = new Messenger(nickname || 'Unknown');
    messenger.onMessageReceived(this.onMessageReceived);

    await messenger.init();

    this.setState({ messenger });
  };

  public onMessageReceived = () => {
    this.forceUpdate();
  };

  public render() {
    const {
      nickname,
      messenger
    } = this.state;

    const messages = !!messenger ? messenger.getMessages() : [];

    return <div className='terminal'>
      <div className='header'>
        Chatter
      </div>
      <div className='content'>
        {
          !messenger && <Nickname
            nickname={nickname}
            onClick={this.onClickNickname}
            onChange={this.onChangeNickname}
          />
        }
        {
          !!messenger && <>
            <Messages messages={messages} />
            <Sendler messenger={messenger} />
          </>
        }
      </div>
    </div>;
  }
}
