const express = require('express');
const Dev = require('../models/Dev');

module.exports = {

    async store(req, res) {

        const { devId } = req.params;
        const { user } = req.headers;

        const loggedDdev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev) {
            return res.status(400).json({ error: 'Dev not exists' });
        }

        if (targetDev.likes.includes(loggedDdev._id)) {
            console.log('Deu Math');
        }

        loggedDdev.likes.push(targetDev._id);
        await loggedDdev.save();

        return res.json({ loggedDdev });


    }

};