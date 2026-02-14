export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxFgwdO8wfXPoayZBSDh6dZj44FUc1rbJf9ySqDCMGcyYWEKi1euqKevNcO0uSzX7PulA/exec";

  const data = {
    name: req.body.input_name || '',
    mobile: req.body.input_phone_no || '',
    email: req.body.input_email || '',
    form: req.body.onclick || 'Enquire Now',
    project: 'Godrej Khargar',
    date: new Date().toLocaleDateString('en-GB'),
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
    url: req.headers.referer || ''
  };

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    return res.redirect(302, '/thank-you/');
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return res.redirect(302, '/thank-you/');
  }
}
