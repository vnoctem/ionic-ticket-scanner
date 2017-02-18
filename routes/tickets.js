var passport = require('passport');
var router = require('express').Router();
var tickets = require('../models/tickets');
var _ = require('lodash');

router.post('/validation', passport.authenticate('jwt', { session: false }), function (req, res) {
    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].GUID == req.body.GUID) {
            let ticket = _.cloneDeep(tickets[i]);
            // Should also update a property so that we can't scan the same qr code several times
            // Remove GUID from the response
            delete tickets.GUID;
            res.json({ 'ticket': ticket });
            return;
        }
    }

    // If nothing found, it means the GUID is not vavlid
    res.status(400).json({});
});

module.exports = router;