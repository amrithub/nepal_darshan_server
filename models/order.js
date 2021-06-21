const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Define Order schema
const Order = new Schema({
	customer_name: {
		type: String,
		required: true
	},
	create_date: {
		type: Date,
		required: true
	},
	modified_date: {
		type: Date,
		required: true
	},
	
	delivery_address: {
		type: String,
		required: true
	},
	order_details: {
		type: String,
		required: true
	},
	
	contact_number: {
		type: Number,
		required: true
	}
})
module.exports = mongoose.model("Order", Order)