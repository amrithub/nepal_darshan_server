// const mongoose = require('mongoose');
// const expect = require('expect');
// const orderUtilities = require('../utils/orders_utils');
// const Order = require('../models/order');
// // set up connection for test database
// const dbConn = "mongodb://localhost/online_dish_app_test"

// // Use done to deal with asynchronous code - done is called when the hooks completes
// before(done => connectToDb(done))

// // Connect to the test database
// function connectToDb(done) {
// 	// Connect to the database (same as we do in app.js)
// 	mongoose.connect(
// 		dbConn,
// 		{
// 			useNewUrlParser: true,
// 			useUnifiedTopology: true,
// 			useFindAndModify: false
// 		},
// 		err => {
// 			if (err) {
// 				console.log("Error connecting to database", err)
// 				done()
// 			} else {
// 				console.log("Connected to database!")
// 				done()
// 			}
// 		}
// 	)
// }
// after(done => {
// 	mongoose.disconnect(() => done())
// })
// beforeEach(async function() {
// 	// Load a test record in setupData
// 	// Use await so we can access the postId, which is used by some tests
// 	let order = await setupData()
// 	orderId = order._id
// })

// function setupData() {
// 	let date = Date.now()
// 	let testOrder = {}
// 	testOrder.customer_name = "tester"
// 	testOrder.create_date = date
//     testOrder.modified_date = date
//     testOrder.delivery_address = "test address"
// 	testOrder.order_details = "This is the first test Order"
//     testOrder.contact_number = 4421
//     	return Order.create(testOrder)
// }
// afterEach((done) => {
//     // Execute the deleteMany query
//     tearDownData().exec(() => done());
// });

// function tearDownData() {
// 	return Order.deleteMany()
// }
// describe.only('getAllOrders with one order', () => {
//     it('should get an order if one exists', async function () {
//         let req = {
//             query: {}
//         };
//         await orderUtilities.getAllOrders(req).exec((err, orders) => {
//             expect(Object.keys(orders).length).toBe(1);
//         });
//     });
//     it('name of first order should be tester', async function () {
//         let req = {
//             query: {}
//         };
//         await orderUtilities.getAllOrders(req).exec((err, orders) => {
//             expect(orders[0].customer_name).toBe('tester');
//         });

//     });
// });
// describe.only('getOrdertById', () => {
//     it('name of first post should be tester', async function () {
//         // Set up req with postId
//         let req = {
//             params: {
//                 id: orderId
//             }
//         }
//         await orderUtilities.getOrderById(req).exec((err, order) => {
//             expect(order.customer_name).toBe('tester');
//         });
//     });
// });
// describe.only('addOrder', () => {
//     it('should add an order', async function () {
//         // define a req object with expected structure
//         const req = {
//             body: {
//                 customer_name: "tester",
//                 delivery_address: "test Address",
//                 order_details: "test order",
//                 contact_number: 4421,
                
//             }
//         }
//         await orderUtilities.addOrder(req).save((err, order) => {
//             expect(order.customer_name).toBe(req.body.customer_name);
//         });
//     });
// });
// describe.only('deleteOrder', () => {
//     it('should delete the specified order', async function () {
//         await orderUtilities.deleteOrder(orderId).exec();
//         await Order.findById(orderId).exec((err, order) => {
//             expect(order).toBe(null);
//         });
//     });
// });
// describe.only('updateOrder', () => {
//     it('should update a Order', async function () {
//         // set up a req object
//         const req = {
//             body: {
//                 customer_name: "tester",
//                 delivery_address: "test Address",
//                 order_details: "test order",
//                 contact_number: 4421,
                
//             }
//         }
//         await orderUtilities.addOrder(req).save((err, order) => {
//             expect(order.customer_name).toBe(req.body.customer_name);
//         });
//     });
// });