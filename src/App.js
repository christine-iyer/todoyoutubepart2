import { useState, useEffect } from 'react'
import './App.css'
import TodoList from './components/TodoList/TodoList'
import { SortableItem } from './components/SortableItem'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container  from 'react-bootstrap/Container';
import {
    DndContext,
    closestCenter
  } from "@dnd-kit/core";
  import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy
  } from "@dnd-kit/sortable";
  

export default function App(){
    const [todos, setTodos] = useState([])
    const [completedTodos, setCompletedTodos] = useState([])
    const [newTodo, setNewTodo] = useState({
        title: '',
        completed: false
    })


    //createTodos
    const createTodo = async () => {
        const body = {...newTodo}
        try {
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const createdTodo = await response.json()
            const todosCopy = [createdTodo,...todos]
            setTodos(todosCopy)
            setNewTodo({
                title: '',
                completed: false
            })
        } catch (error) {   
            console.error(error)
        }
    }
    //deleteTodos
    const deleteTodo = async (id) => {
        try {
            const index = completedTodos.findIndex((todo) => todo._id === id)
            const completedTodosCopy = [...completedTodos]
            const response = await fetch(`/api/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            await response.json()
            completedTodosCopy.splice(index, 1)
            setCompletedTodos(completedTodosCopy)
        } catch (error) {
            console.error(error)
        }
    }
    //moveToCompleted
    const moveToCompleted = async (id) => {
        try {
            const index = todos.findIndex((todo) => todo._id === id)
            const todosCopy = [...todos]
            const subject = todosCopy[index]
            subject.title = subject.title+1 
            const response = await fetch(`/api/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subject)
            })
            const updatedTodo = await response.json()
            const completedTDsCopy = [updatedTodo, ...completedTodos]
            
            setCompletedTodos(completedTDsCopy)
            todosCopy.splice(index, 1)
            setTodos(todosCopy)
        } catch (error) {
            console.error(error)
        }
    }

    
    //getTodos
    const getTodos = async () => {
        try{
            const response = await fetch('/api/todos')
            const foundTodos = await response.json()
            setTodos(foundTodos.reverse())
            const responseTwo = await fetch('/api/todos/completed')
            const foundCompletedTodos = await responseTwo.json()
            setCompletedTodos(foundCompletedTodos.reverse())
        } catch(error){
            console.error(error)
        }
    }
    
    useEffect(() => {
        getTodos()
    }, [])
    return(
        <>
            <div>
        <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}>
          <Container className="p-3" style={{"width": "50%"}} align="center" >
            <SortableContext items={todos} strategy={verticalListSortingStrategy}>
{todos.map(todo=> <SortableItem key={todo._id} id={todo.title}/>)}
            </SortableContext>
          </Container>


        </DndContext>

      </div>

            <TodoList
            newTodo={newTodo}
            setNewTodo={setNewTodo}
            createTodo={createTodo}
            todos={todos}
            moveToCompleted={moveToCompleted}
            completedTodos={completedTodos}
            deleteTodo={deleteTodo}
            />
        </>
    )
    function handleDragEnd(event){
        console.log("Drag End")
        const {active,over}=event
        console.log('active'+ active.id)
        console.log('over' + over.id)
        if(active.id !== over.id) {
          setTodos((items) => {
            const activeIndex = items.indexOf(active.id);
            const overIndex = items.indexOf(over.id);
            console.log(arrayMove(items, activeIndex, overIndex));
            return arrayMove(items, activeIndex, overIndex);
          });
          
        }
      
      
      }
   
      
}