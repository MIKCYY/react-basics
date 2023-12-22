import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
   const [title, setTitle] = useState('');
   const [body, setBody] = useState('');
   const [price, setPrice] = useState('');
   const [isPending, setIsPending] = useState(false);
   const history = useHistory();

   const handleSubmit = (e) => {
      e.preventDefault();
      const item = {title, body, price};
      console.log(item);
      setIsPending(true);
      fetch('http://localhost:8000/products', {
         method:'POST',
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify(item)
      }).then(() => {
         console.log('new item added');
         setIsPending(false);
         history.push('/');
      })
   }
      
   return (
      <div className="create">
         <h2> Add a New item </h2>
         <form onSubmit={handleSubmit}>
            <label> Item title:</label>
            <input type="text" required  value={title} onChange= {(e) => setTitle(e.target.value)}/>
            <label> Item description:</label>
            <textarea type ="text" required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
            <label> Item price:</label>
            <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)}/>
           {!isPending && <button> Add Item</button>}
           {isPending && <button disabled> Adding Item...</button>}
            {/* <p> {title}</p>
            <p> {body}</p>
            <p> {price}</p> */}


         </form>
      </div>
   );
}

export default Create;