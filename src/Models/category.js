const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    books: [{
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    }]
});

module.exports = mongoose.model("Category", schema);