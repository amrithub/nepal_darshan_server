const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Define Post schema
const Post = new Schema({
	name: {
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
	price: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: true
	}

	
})
module.exports = mongoose.model("Post", Post)