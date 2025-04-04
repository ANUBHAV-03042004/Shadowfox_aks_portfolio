// script.js
const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config(); // Load environment variables from .env

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/project', (req, res) => {
    res.render('project');
});

app.get('/skill', (req, res) => {
    res.render('skill');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/send-message', async (req, res) => {
    const { name, email, message } = req.body;
    const botToken = process.env.BOT_TOKEN; // Load from .env
    const chatId = process.env.CHAT_ID; // Load from .env

    // Validate environment variables
    if (!botToken || !chatId) {
        console.error('Missing BOT_TOKEN or CHAT_ID in environment variables');
        return res.status(500).json({ message: 'Server configuration error: Missing bot token or chat ID.' });
    }

    // Log the values for debugging
    console.log('Bot Token:', botToken);
    console.log('Chat ID:', chatId);

    const text = `New Query:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
    console.log('Message Text:', text);

    // Log the full URL for debugging
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    console.log('Telegram API URL:', telegramUrl);

    try {
        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
            }),
        });

        const result = await response.json();
        console.log('Telegram API Response:', result);

        if (result.ok) {
            res.status(200).json({ message: 'Message sent successfully!' });
        } else {
            console.error('Telegram API error:', result);
            res.status(500).json({ message: 'Failed to send message to Telegram: ' + result.description });
        }
    } catch (error) {
        console.error('Error sending message to Telegram:', error);
        res.status(500).json({ message: 'An error occurred while sending the message.' });
    }
});

app.get('/*', (req, res) => {
    res.render('page_not_found');
});

app.listen(3000, () => {
    console.log('server connected...');
});