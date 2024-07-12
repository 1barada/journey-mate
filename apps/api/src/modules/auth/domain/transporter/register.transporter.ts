export interface SendEmailConfirmationParams {
  to: string;
  confirmationUrl: string;
}

export type SendEmailConfirmationResult = void;

export interface RegisterTransporterPort {
  /**
   * @param to - email of receiver
   * @param confirmationUrl - confirmation url that will be placed in email
   */
  sendEmailConfirmation(props: SendEmailConfirmationParams): Promise<SendEmailConfirmationResult>;
}
