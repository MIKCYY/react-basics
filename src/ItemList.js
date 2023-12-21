import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ItemList = ({items , title}) => {
    // const items = props.items;
    // console.log(props,items);
    return ( 
     
        <div className="item-list">
          <h2>{title}</h2>
            {items.map((item) => (
              <div className="item-preview" key={item.id}>
              <Link to={`/items/${item.id}`}>
                 <h2>{item.title}</h2>
                 <p> Description: {item.body}</p>
                 <h2>Price : {item.price}</h2>
                 {/* <button onClick={() => handleDelete(item.id) }> Delete </button> */}
                 </Link>  
            </div>
         ))}
         </div>
     );
      
      
}
 
export default ItemList;