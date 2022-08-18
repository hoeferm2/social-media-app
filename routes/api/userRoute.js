const router = require('express').Router()

const {
    getAllUser,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/users-controllers')

router.route('/').get(getAllUser).post(createUser)

router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser)

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router