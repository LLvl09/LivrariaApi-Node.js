const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    summary: {
        type: String,
        required: true,
        trim: true
    },
    books: [{
        quantity: {
            type: Number,
            required: true,
            trim: true,
            default: 1
        },
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            require: true
        }
    }]
});

module.exports = mongoose.model("Author", schema);