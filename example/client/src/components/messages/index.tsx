import { Message } from 'services';
import React from 'react';
import './messages.less';

interface IProps {
  messages: Message[];
}

export class Messages extends React.Component<IProps> {
  public plainDate = (date: Date): string => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes().toString()}`;
  };

  public render() {
    const { messages } = this.props;
    return <div className='messages'>
      {messages.map((message, index) => <div className='chip' key={index}>
        <span className='one-nickname'>{message.nickname}: </span>
        <span className='one-message'>{message.text}</span>
        <span className='one-date'>{this.plainDate(message.date)}</span>
      </div>)}
    </div>;
  }
}
