import Todo from '../Todo/Todo'
import styles from './TodoList.module.scss'

export default function TodoList ({ 
    newTodo, 
    createTodo, 
    setNewTodo, 
    todos,
    completedTodos,
    moveToCompleted,
    deleteTodo
}){
    return(
        <div className={styles.todolist}>
            Add New Todo:<input className={styles.input} type="text" 
            value={newTodo.title} 
            onChange={(e) => {
                setNewTodo({...newTodo, title: e.target.value})
            }} 
            onKeyDown={(e) => {
                e.key === 'Enter' && createTodo()
            }}
            />
             <hr></hr>
             <h3>Todos</h3>
        {todos.map(todo => (
            <Todo 
                key={todo._id} 
                todo={todo}
                buttonAction={moveToCompleted}
                buttonText={'Complete'}
            />

        ))}

        <hr></hr>
        <h3>Completed Todos</h3>
        {completedTodos.map(todo =>(
            <Todo
                key={todo._id}
                todo={todo}
                buttonAction={deleteTodo}
                buttonText={'Delete'}
            />
        ))}
        </div>
    )
}