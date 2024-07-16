import { config } from '@project/api/config';
import { NodemailerTransporterType } from '@project/api/transporter';

import {
  RegisterTransporterPort,
  SendEmailConfirmationParams,
  SendEmailConfirmationResult,
} from '../domain/transporter/register.transporter';

export class RegisterNodemailerTransporter implements RegisterTransporterPort {
  constructor(private transporter: NodemailerTransporterType) {}

  async sendEmailConfirmation(props: SendEmailConfirmationParams): Promise<SendEmailConfirmationResult> {
    const emailBody = `
      <div>
        <p>To finish registration please click on the link below</p>
        <a href="${props.confirmationUrl}">Confirm registration</a>
      </div>
    `;

    const response = await this.transporter.sendMail({
      to: props.to,
      from: {
        name: 'Journey mate',
        address: config.get('emailUser'),
      },
      subject: 'Confirm the registration',
      html: emailBody,
    });

    if (response.accepted[0] !== props.to) throw new Error(`unable to send confirmation email to ${props.to}`);

    return;
  }
}
