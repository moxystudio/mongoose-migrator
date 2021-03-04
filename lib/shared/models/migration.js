'use strict';

const mongoose = require('mongoose');

const MigrationSchema = new mongoose.Schema({
    version: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const toObject = (doc, { _id, _v, ...rest }) => ({ id: _id, ...rest });

MigrationSchema.set('toObject', { transform: toObject });
MigrationSchema.set('toJSON', { transform: toObject });

MigrationSchema.index({ version: 1 });
MigrationSchema.index({ version: -1 });

module.exports = mongoose.model('_migrations', MigrationSchema);
