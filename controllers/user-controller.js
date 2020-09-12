const {
    User
} = require('../models');

const UserController = {
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .sort({
                _id: -1
            })
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
          .populate({
            path: 'thoughts',
            select: '-__v'
          })
          .select('-__v')
          .then(dbPizzaData => res.json(dbPizzaData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },

    createUser({
        body
    }, res) {
        User.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },

    updateUser({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbPizzaData => {
            if (!dbPizzaData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbPizzaData);
          })
          .catch(err => res.json(err));
      },

      deleteUser({
        params
    }, res) {
        User.findOneAndDelete({
                _id: params.id
            })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({
                        message: 'No pizza found with this id!'
                    });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    },

}