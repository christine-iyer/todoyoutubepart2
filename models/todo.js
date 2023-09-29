const { model, Schema } = require('mongoose')

const todoSchema = new Schema({
    title: {required: true, type: Number},
    completed: { required: true, type: Number}
}, {
    timestamps: true
})

const Todo = model('Todo', todoSchema)

module.exports = Todo;