const express = require('express')
const router = express.Router()
const {
    getOrders,
    getOrder,
    makeOrder,
    removeOrder,
    
    
    verifyOwner
} = require('../controllers/orders_controller')

const {userAuthenticated, isAdmin} = require('../utils/admin_utils')

// READ
// GET on '/posts'
// Returns all posts
router.get('/', getOrders)

// READ
// GET on '/Orders/:id'
// Returns Order with given id
router.get('/:id', getOrder)

// For post, delete, put -require authenticated user
router.use(userAuthenticated)
// CREATE
// POST on '/posts'
// Creates a new post
router.post('/',  userAuthenticated, makeOrder)

// DELETE
// DELETE on '/posts/:id'
// Deletes a post with id
router.delete('/:id',isAdmin, removeOrder)



module.exports = router