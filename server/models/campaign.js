const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    description: {
        required: false,
        type: String
    },
    isActive:{
        required: true,
        type: Boolean
    },
    dmId:{
        required: true,
        type: String
    }
})

mongoose.model('campaigns', campaignSchema);