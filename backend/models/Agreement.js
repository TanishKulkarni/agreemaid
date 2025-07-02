const mongoose = require('mongoose');

const AgreementSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    parties: [String],
    expiry_date: String,
    type: String,
    fileUrl: String,
}, { timestamps: true });

module.exports = mongoose.model('Agreement', AgreementSchema);