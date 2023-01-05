const mongoose = require('mongoose');
const Author= mongoose.model('Author');

exports.get = async () => {
    const res = await Author.find({})
    return res;
}

exports.getById = async (id) => {
    const res = await Author.findOne(id);
    return res;
}

exports.create = async (body) => {
    const author = new Author(body);
    await author.save();
}

exports.update = async (id, body) => {
    await Author
        .findByIdAndUpdate(id, {
            $set: {
                name: body.name,
                summary: body.summary,
                books: body.books
            }
        })
}

exports.delete = async (id) => {
    await Author.findByIdAndRemove(id);
}