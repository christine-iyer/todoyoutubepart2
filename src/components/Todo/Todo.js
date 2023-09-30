// import styles from './Todo.module.scss'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function Todo({ todo, buttonAction, buttonText }){
    // return(
    //        <div className={styles.todo}>{todo.title} 
    //                 <button className={styles.button} onClick={() => buttonAction(todo._id) }>{buttonText}</button>
    //         </div>
    // )


return (
    <Card>
      <Card.Header as="h5">{todo.title}</Card.Header>
      <Card.Body>
        <Card.Title>{todo.title}</Card.Title>
        <Card.Text>
          Hi
        </Card.Text>
        <Button variant="primary" onClick={() => buttonAction(todo._id) }>{buttonText}</Button>
      </Card.Body>
    </Card>
  );
}