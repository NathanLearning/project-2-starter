// create a server side script with express 
const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.static(path.join(_dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey = 'public key url base64';
const privateVapidKey = 'private key url base64';

webpush.setVapidDetails(
    'mailto:test@test.com',
    publicVapidKey,
    privateVapidKey);

//create subscribe route
app.post('/subscribe', (req, res) => {
    // get pushSub objetc
    const subscription = req.body;

    res.status(201).json({});

    const payload = JSON.stringify({ title: 'Push Test' });

    webpush.sendNotification(subscription, payload).catch(err => console.error(err));
});

const port = 3030

app.listen(port, () => console.log(`Server started on port ${port}`));