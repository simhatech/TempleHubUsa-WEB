import apiClient from '../client';

export interface SendNotificationRequest {
  title: string;
  body: string;
  topic: string;
  type: string;
}

export const adminNotificationsApi = {
  send: (data: SendNotificationRequest) =>
    apiClient.post('/notifications/send', data).then((r) => r.data),
};
