import React from 'react';
import { Notification } from '../../services/notification';

export class NotificationContainer extends React.Component {
  public componentDidMount() {
    Notification.store.subscribe();
  }

  public componentWillUnmount() {
    Notification.store.unsubscribe();
  }

  public render() {
    return '';
  }
}
