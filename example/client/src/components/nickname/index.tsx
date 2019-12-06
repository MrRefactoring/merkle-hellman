import { Button } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import './nickname.less';

interface IProps {
  nickname?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

export class Nickname extends React.PureComponent<IProps> {
  public render() {
    const { nickname = '', onChange, onClick } = this.props;

    return <div className='nickname'>
      <span className='label'>Enter your nickname</span>
      <div className='field'>
        <input value={nickname} onChange={onChange} />
        <Button onClick={onClick} variant='contained'>
          Chat
        </Button>
      </div>
    </div>;
  }
}
