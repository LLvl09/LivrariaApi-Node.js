const mongoose = require('mongoose');
const Book = mongoose.model('Book');


exports.get = async () => {
    const res = await Book.find({})
    return res;
}

exports.getById = async (id) => {
    const res = await Book.findOne(id);
    return res;
}

exports.create = async (body) => {
    const book = new Book(body);
    await book.save();
}

exports.update = async (id, body) => {
    await Book
        .findByIdAndUpdate(id, {
            $set: {
                name: body.name,
                price: body.price,
                description: body.description,
                category: body.category,
                author: body.author
            }
        })
}

exports.delete = async (id) => {
    await Book.findByIdAndRemove(id);
}