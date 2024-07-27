export interface SendEmailRestorePasswordUser {
  active: boolean;
  name: string;
}

export interface SendEmailRestorePasswordParams {
  to: string;
  confirmationUrl: string;
  user: SendEmailRestorePasswordUser;
}

export type SendEmailRestorePasswordResult = void;

export interface RestorePasswordTransporterPort {
  /**
   * @param to - email of receiver
   * @param restorePasswordUrl - restorePassword url that will be placed in email
   * @param user - user data that will be placed in email and used to verify that user is activated
   */
  sendEmailRestorePassword(props: SendEmailRestorePasswordParams): Promise<SendEmailRestorePasswordResult>;
}
