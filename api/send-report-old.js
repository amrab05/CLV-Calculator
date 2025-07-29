// CLV Calculator Mail Carrier - api/send-clv-report.js
import { ServerClient } from 'postmark';

const postmark = new ServerClient(process.env.POSTMARK_API_TOKEN);

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }
    try {
        const { leadName, leadEmail, reportData } = request.body;
        const fromAddress = 'mike@aiadvisorsgroup.co'; 

        if (!leadEmail || !reportData) { return response.status(400).json({ error: 'Missing data.' }); }

        const greeting = leadName ? `Hi ${leadName},` : 'Hello,';
        const leadIdentifier = leadName ? `${leadName} (${leadEmail})` : leadEmail;

        const htmlBody = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #4c3c7a; color: white; padding: 20px;">
                    <h2 style="margin: 0;">Your CLV & Churn Impact Report</h2>
                </div>
                <div style="padding: 20px;">
                    <p>${greeting}</p>
                    <p>Thank you for using the CLV Calculator. Here is the Churn Impact report you generated:</p>
                    <table style="width: 100%; text-align: left; border-collapse: collapse; margin: 20px 0;">
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <th style="padding: 10px; color: #718096;">Metric</th>
                            <th style="padding: 10px; color: #718096;">Value</th>
                        </tr>
                        <tr>
                            <td style="padding: 10px;">Original CLV</td>
                            <td style="padding: 10px; font-weight: bold; color: #38a169;">${reportData.originalClv}</td>
                        </tr>
                        <tr style="background-color: #f7fafc;">
                            <td style="padding: 10px;">Value at Risk</td>
                            <td style="padding: 10px; font-weight: bold; color: #e53e3e;">${reportData.valueLost}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px;">Adjusted CLV</td>
                            <td style="padding: 10px; font-weight: bold; color: #dd6b20;">${reportData.adjustedClv}</td>
                        </tr>
                    </table>
                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
                    <h3 style="color: #4c3c7a;">The Anti-Churn Doctrine in Action</h3>
                    <p>This report shows the real financial cost of a single at-risk customer. Protecting that "Value at Risk" is the key to sustainable growth.</p>
                    <p>Our free <strong>Complaint Compass</strong> tool is the first step. It gives you the exact words to de-escalate a complaint and save the customer relationship before it impacts your bottom line.</p>
                    <p><a href="https://compass.aiadvisorsgroup.co/" style="color: #4c3c7a; font-weight: bold;">Try Complaint Compass Now →</a></p>
                    <p>Best regards,<br>The Team at AI Advisors Group</p>
                </div>
            </div>
        `;

        await postmark.sendEmail({ "From": fromAddress, "To": leadEmail, "Subject": "Your CLV & Churn Impact Report", "HtmlBody": htmlBody });
        await postmark.sendEmail({ "From": fromAddress, "To": fromAddress, "Subject": "New Lead from CLV Calculator!", "HtmlBody": `New lead captured: <strong>${leadIdentifier}</strong>` });

        return response.status(200).json({ message: 'Report sent successfully!' });

    } catch (error) {
        console.error('Postmark API Error:', error);
        return response.status(500).json({ error: 'Failed to send report.' });
    }
}