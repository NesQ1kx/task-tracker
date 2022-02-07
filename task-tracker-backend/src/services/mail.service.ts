import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  public async sendConfirmationCode(code: string, email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Подтверждение регистрации в TaskTracker',
      text: `Ваш код подтверждения: ${code}`
    })
  }
}