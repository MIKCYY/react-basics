import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";

const ItemDetails = () => {
    const { id } = useParams();
    const { data: item, error, isPending } = useFetch('http://localhost:8000/items/' + id);
    const history = useHistory();
    const handleDelete = () => {
        fetch('http://localhost:8000/items/' + item.id, {
            method:'DELETE',
         }).then(() => {
            console.log('item deleted');
            history.push('/');
         })
    }
    return (
        <div className="item-details">
            {isPending && <div> Loading... </div>}
            {error && <div> {error} </div>}
            {item && (
                <div>
                    <h2> {item.title} </h2>
                    <p> {item.body} </p>
                    <h2> {item.price} </h2>
                    <button onClick={handleDelete}> Delete </button>
                </div>
            )}
        </div>
    );
}

export default ItemDetails;