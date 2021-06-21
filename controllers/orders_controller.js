const {
    getAllOrders,
    getOrderById,
    addOrder,
    deleteOrder
    
} = require('../utils/orders_utils');
const { userAuthenticated } = require('../utils/admin_utils');

const getOrders = function (req, res) {
    getAllOrders(req).
    sort({
        modified_date: -1
    }).
    exec((err, orders) => {
        if (err) {
            res.status(500);
            return res.json({
                error: err.message
            });
        }
        res.send(orders);
    });
};

const getOrder = function (req, res) {
    //if(req.user.role === 'admin') {
    // execute the query from getOrderById
   // (req.body.username === req.user.username;
    getOrderById(req).exec((err, order) => {
        if (err) {
            res.status(400);
            return res.send("Post not found");
        }
        res.send(order);
    });
};

const makeOrder = function (req, res) {
    //console.log('superb')
    // add the username from req.user
    //if(req.user.role === 'admin'){
   // if (userAuthenticated == 1)
   //req.body.username = req.user.username;
    // save the Order instance from addOrder
    addOrder(req).save((err, order) => {
        if (err) {
            res.status(500);
            return res.json({
                error: err.message
            });
        }
        res.status(201);
        res.send(order);
    });
    
        
    

};

const removeOrder = function (req, res) {
    if(req.user.role === 'admin'){
    // Check for error from middleware
    if (req.error) {
        res.status(req.error.status);
        res.send(req.error.message);
    } else {
        // execute the query from deleteOrder
        deleteOrder(req.params.id).exec((err) => {
            if (err) {
                res.status(500);
                return res.json({
                    error: err.message
                });
            }
            res.sendStatus(204);
        });}
    }
};




const validUser = function (req, res, next) {
    // If user is blocked, send back an error
    if (req.user.blocked) {
        req.error = {
            message: 'User is blocked',
            status: 403
        };
    }
    next();
}

module.exports = {
    getOrders,
    getOrder,
    makeOrder,
    removeOrder,
    validUser
};
