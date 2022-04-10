import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  public async sendConfirmationCode(code: string, email: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Подтверждение регистрации в TaskTracker',
      text: `Ваш код подтверждения: ${code}`
    });
  }

  public async sendTwoFaConfirmation(code: string, email: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Подтверждение 2FA TaskTracker',
      text: `Ваш код подтверждения: ${code}. Если вы не предпринимали попыток входа в приложение, проигнорируйте это письмо и смените пароль в приложении.`
    })
  }
}