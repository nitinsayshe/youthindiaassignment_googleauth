const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
const process = require('process');
const path = require('path');
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

// CREDENTIALS_PATH={"installed":{"client_id":"600563067273-nhoja0gt4hmprq223bjsaso6ifutkhf9.apps.googleusercontent.com","project_id":"modular-decoder-362517","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"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","redirect_uris":["http://localhost"]}}
async function authorize() {
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  return client;
}

exports.googleAuth = async (req, res) => {
 
  // return client;
  // return res.send({ client })
   auth=await authorize()
    const calendar = google.calendar({version: 'v3', auth});
    const result = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    const events = result.data.items;
    let eventList=[]
    events.map((event, i) => {
      const start = event.start.dateTime || event.start.date;
      eventList.push(`${start} - ${event.summary}`);
    });
    return res.send({UpComingEventList:eventList})

}






