const router = require('express').Router()

const {
    getAllUser,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    //TODO:
    getAllFriends,
    addFriend,
    deleteFriend,
} = require('../../controllers/users-controllers')

//gets all users / allows you to create a new user

router.route('/').get(getAllUser).post(createUser)

// get user based on id // update based on user id // delete based on user id

router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser)

//TODO:
router.route('/:userId/friends').get(getAllFriends)

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router