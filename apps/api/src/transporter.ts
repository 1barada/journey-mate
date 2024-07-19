import { createTransport } from 'nodemailer';

import { config } from './config';

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: config.get('emailUser'),
    pass: config.get('emailPassword'),
  },
});

await transporter.verify();

export type NodemailerTransporterType = typeof transporter;

export { transporter };
