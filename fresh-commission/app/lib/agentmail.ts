// Minimal AgentMail REST client, server-side only. Modelled on AgentMail's
// documented "send a message from an inbox" shape:
//   POST https://api.agentmail.to/v0/inboxes/{inbox_id}/messages/send
//   Authorization: Bearer <AGENTMAIL_API_KEY>
//   { to: string[], subject: string, text?: string, html?: string, replyTo?: string[] }
//
// The sending inbox for this institution is admissions.almadeenah@agentmail.to.

const AGENTMAIL_BASE = "https://api.agentmail.to/v0";
const SENDING_INBOX = "admissions.almadeenah@agentmail.to";

export class AgentMailError extends Error {}

export async function sendMail(opts: {
  to: string[];
  subject: string;
  text: string;
  html: string;
}): Promise<void> {
  const apiKey = process.env.AGENTMAIL_API_KEY;
  if (!apiKey) {
    throw new AgentMailError(
      "AGENTMAIL_API_KEY is not set — email was not sent."
    );
  }

  const res = await fetch(
    `${AGENTMAIL_BASE}/inboxes/${encodeURIComponent(SENDING_INBOX)}/messages/send`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        to: opts.to,
        subject: opts.subject,
        text: opts.text,
        html: opts.html,
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new AgentMailError(
      `AgentMail send failed: ${res.status} ${res.statusText} ${body}`
    );
  }
}
