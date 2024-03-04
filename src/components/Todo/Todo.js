// import styles from './Todo.module.scss'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function Todo({ todo, buttonAction, buttonText }){
  const truncate = (string) => {
    const newText = string.substring(4, 9);
    return newText;
  };
  
return (
    <Card>
      <Card.Header as="h5">ID: {truncate(todo._id)}</Card.Header>
      <Card.Body>
        <Card.Title>{todo.title}{todo.title > 3 ? "🖤" : "❤️"}</Card.Title>
        <Card.Text>
          
        </Card.Text>
        <Button variant="primary" onClick={() => buttonAction(todo._id) }>{buttonText}</Button>

      </Card.Body>
    </Card>
  );
}