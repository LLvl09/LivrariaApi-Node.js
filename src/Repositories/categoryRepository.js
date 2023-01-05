const mongoose = require('mongoose');
const Category= mongoose.model('Category');

exports.get = async () => {
    const res = await Category.find({})
    return res;
}

exports.getById = async (id) => {
    const res = await Category.findOne(id);
    return res;
}

exports.create = async (body) => {
    const category = new Category(body);
    await category.save();
}

exports.update = async (id, body) => {
    await Category
        .findByIdAndUpdate(id, {
            $set: {
                name: body.name,
                books: body.books
            }
        })
}

exports.delete = async (id) => {
    await Category.findByIdAndRemove(id);
}