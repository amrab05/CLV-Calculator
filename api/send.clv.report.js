
// Final CLV Calculator Mail Carrier - api/send-clv-report.js

import { ServerClient } from 'postmark';

const postmark = new ServerClient(process.env.POSTMARK_API_TOKEN);

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { leadName, leadEmail, reportData } = request.body;
        const fromAddress = 'no-reply@aiadvisorsgroup.co';
        const toAddress = leadEmail;

        if (!leadEmail || !reportData) {
            return response.status(400).json({ error: 'Missing data.' });
        }

        const greeting = leadName ? `Hi ${leadName},` : 'Hello,';

        const htmlBody = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #4c3c7a; color: white; padding: 20px;">
                    <h2 style="margin: 0;">Your CLV & Churn Impact Report</h2>
                </div>
                <div style="padding: 20px;">
                    <p>${greeting}</p>
                    <p>Thank you for using the CLV Calculator. Here is the Churn Impact report you generated:</p>
                    <pre style="background-color: #f8f9fa; padding: 10px; border-radius: 4px;">${reportData}</pre>
                    <p style="margin-top: 30px;">Best regards,<br><strong>The AI Advisors Group Team</strong></p>
                </div>
            </div>`;

        await postmark.sendEmail({
            From: fromAddress,
            To: toAddress,
            Subject: "Your CLV & Churn Impact Report",
            HtmlBody: htmlBody
        });

        response.status(200).json({ message: 'Email sent successfully' });

    } catch (error) {
        console.error('Postmark error:', error);
        response.status(500).json({ error: 'Failed to send email' });
    }
}
