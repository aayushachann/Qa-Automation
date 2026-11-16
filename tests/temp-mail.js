
import 'dotenv/config';

async function getMessages(emailAddress) {
  const response = await fetch(
    `https://mailsac.com/api/addresses/${encodeURIComponent(emailAddress)}/messages`,
    {
      headers: {
        'Mailsac-Key': process.env.MAILSAC_API_KEY
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Mailsac API error: ${response.status}`);
  }

  return await response.json();
}

export async function getExistingMessageIds(emailAddress) {
  const messages = await getMessages(emailAddress);
  return messages.map(message => message._id);
}

export async function getLatestOtp(emailAddress, previousMessageIds) {
  const deadline = Date.now() + 60000;

  while (Date.now() < deadline) {
    const messages = await getMessages(emailAddress);

    const newMessages = messages.filter(
      message => !previousMessageIds.includes(message._id)
    );

    for (const message of newMessages) {
      const response = await fetch(
        `https://mailsac.com/api/text/${encodeURIComponent(emailAddress)}/${message._id}`,
        {
          headers: {
            'Mailsac-Key': process.env.MAILSAC_API_KEY
          }
        }
      );

      if (!response.ok) continue;

      const emailText = await response.text();
      const match = emailText.match(/\b\d{6}\b/);

      if (match) {
        console.log('New OTP email received:', message.received);
        return match[0];
      }
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  throw new Error('New OTP email not received within 60 seconds.');
}
