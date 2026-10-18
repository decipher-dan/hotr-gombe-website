const express = require('express');
const cors = require('cors');
const eventsRouter = require('./src/routes/events');
const sermonsRouter = require('./src/routes/sermon')
const firstTimerRouter = require('./src/routes/firstTimer')
const partnershipRouter = require('./src/routes/partnership')
const paymentsRouter = require('./src/routes/payment');
const contactRouter = require('./src/routes/contact');
const adminRouter = require('./src/routes/admin');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/events', eventsRouter);
app.use('/api/sermon', sermonsRouter);
app.use('/api/first-timer', firstTimerRouter);
app.use('/api/partnership', partnershipRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/prayer-request', require('./src/routes/prayerRequest'));
app.use('/api/admin', adminRouter);

module.exports = app;