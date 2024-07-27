import { config } from '@project/api/config';
import { NodemailerTransporterType } from '@project/api/transporter';

import { AccountNotActivatedError } from '../domain/errors/account-not-activated.error';
import {
  RestorePasswordTransporterPort,
  SendEmailRestorePasswordParams,
  SendEmailRestorePasswordResult,
} from '../domain/transporter/restorePassword.transporter';

import { CantSendEmailError } from './errors/cant-send-email.error';

export class RestorePasswordNodemailerTransporter implements RestorePasswordTransporterPort {
  constructor(private transporter: NodemailerTransporterType) {}

  async sendEmailRestorePassword(props: SendEmailRestorePasswordParams): Promise<SendEmailRestorePasswordResult> {
    if (!props.user.active) {
      throw new AccountNotActivatedError("To restore password firs activate you're account");
    }

    const emailBody = `
      <div>
        <p>To restore ${
          props.user.name ? 'user ' + props.user.name : 'account'
        } password please click on the link below</p>
        <a href="${props.restorePasswordUrl}">Restore password</a>
      </div>
    `;

    const response = await this.transporter.sendMail({
      to: props.to,
      from: {
        name: 'Journey mate',
        address: config.get('emailUser'),
      },
      subject: 'Restore password',
      html: emailBody,
    });

    if (response.accepted[0] !== props.to)
      throw new CantSendEmailError(`unable to send restore password email to ${props.to}`);

    return;
  }
}
