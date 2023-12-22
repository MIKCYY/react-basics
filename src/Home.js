
import ItemList from "./ItemList";
import useFetch from "./useFetch";

const Home = () => {
    // let name = 'marionette';
    const{data: items, isPending, error} = useFetch('http://localhost:8000/products');
    return ( 
        <div className="home">
        {error && <div> {error}</div>}
        {isPending && <div>Loading...</div>}
        {items && <ItemList items={items} title=" All Items"/>}
        {items && <ItemList items={items.filter((item) => item.title === 'Bag')} title=" Bag"/>}
        </div>
     );
}
 
export default Home;