interface EmailTemplateParams {
  url: string;
  baseUrl: string;
  email?: string;
}

export function html({ url, baseUrl, email }: EmailTemplateParams): string {
  const escapedEmail = `${email?.replace(/\./g, "&#8203;.")}`;
  const escapedUrl = `${url.replace(/\./g, "&#8203;.")}`;
  const buttonText = "Sign in";
  return `
    <body>
      <p>Hi,</p>
      <p>Click the button below to sign in:</p>
      <a href="${escapedUrl}" style="padding: 10px 20px; background-color: #f3ad18; color: white; text-decoration: none;">${buttonText}</a>
      <p>If you didn't request this, you can safely ignore this email.</p>
    </body>
  `;
}

export function text({ url, baseUrl }: EmailTemplateParams): string {
  return `Sign in to ${baseUrl}\n${url}\n\n`;
}
