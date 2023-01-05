const ValidationContract = require('../Validators/fluenteValidator');
const repository = require('../Repositories/categoryRepository');

exports.get = async (req, res, next) => {
    try {

        const data = await repository.get();
        res.status(200).send(data);

    } catch (e) {
        res.status(500).send({
            message: 'Process request failure'
        });
    }
}

exports.getById = async (req, res, next) => {
    try {
        const data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Process request failure'
        });
    }
}

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();

    contract.hasMinLen(req.body.name, 3, 'The name must contain at least 3 characters');

    //If the data is invalid
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await repository.create(req.body);
        res.status(201).send({ message: 'The category has been successfuly registered' });
    } catch (e) {
        res.status(400).send({ message: 'Failed to register the category', data: e });
    }
}

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body)
        res.status(200).send({ message: 'Category updated to successfuly'})
    } catch (e) {
        res.status(400).send({ message: 'Failed to updated the category', data: e})
    }
}

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.params.id)
        res.status(200).send({message: 'Category deleted to successfuly'});
    } catch (e) {
        res.status(400).send({ message: 'Failed to deleted the category', data: e})
    }
}