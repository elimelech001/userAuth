import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailTemplateService {
  generateVerificationEmail(code: string): EmailTemplate {
    return {
      subject: "Email Verification",
      content: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.5;
                color: #333333;
              }
              h1 {
                color: #555555;
                margin-bottom: 20px;
              }
              h3 {
                color: #777777;
                margin-bottom: 10px;
              }
              p {
                margin-bottom: 10px;
              }
              .code {
                display: inline-block;
                padding: 5px 10px;
                background-color: #f5f5f5;
                border-radius: 5px;
                font-weight: bold;
                color: #333333;
              }
              .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #777777;
              }
            </style>
          </head>
          <body>
            <div style="max-width: 600px; margin: 0 auto;">
              <h1>Email Verification</h1>
              <h3>Your verification code is:</h3>
              <p class="code">${code}</p>
              <p>Thank you!</p>
              <div class="footer">
                <p>This email was sent to you as part of the email verification process.</p>
                <p>Please do not reply to this email.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };
  }
  
  
  
  
  
  
}
