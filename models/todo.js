const { model, Schema } = require('mongoose')

const todoSchema = new Schema({
    title: {required: true, type: String},
    completed: { required: false, type: String}
}, {
    timestamps: true
})

const Todo = model('Todo', todoSchema)

module.exports = Todo;