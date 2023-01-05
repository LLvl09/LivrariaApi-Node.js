const ValidationContract = require('../Validators/fluenteValidator');
const repository = require('../Repositories/bookRepository');

exports.get = async (req, res, next) => {
    try {

        const data = await repository.get();

        //creating a query for know name the book        
        const { name } = req.query;
        const results = name 
            ?data.filter(value => value.name.includes(name))
            :data;
             
        res.status(200).send(results);
        

        
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
    contract.hasMinLen(req.body.description, 3, 'The description must contain at least 3 characters');

    //If the data is invalid
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await repository.create(req.body);
        res.status(201).send({ message: 'The book has been successfuly registered' });
    } catch (e) {
        res.status(400).send({ message: 'Failed to register the book', data: e });
    }
}

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body)
        res.status(200).send({ message: 'Book updated to successfuly'})
    } catch (e) {
        res.status(400).send({ message: 'Failed to updated the book', data: e})
    }
}

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.params.id)
        res.status(200).send({message: 'Book deleted to successfuly'});
    } catch (e) {
        res.status(400).send({ message: 'Failed to deleted the book', data: e})
    }
}