import {useState} from 'react';
import Manager from './Manager';
import Head from '../Header/Header'

const getFilteredItems = (query, items) => {
    if(!query){
        return items;
    }
    return items.filter((song) => song.name.includes(query));
};

export default function App(){
    const [query, setQuery] = useState("");

    const {tracks} = Manager;
    const {items} = tracks;

    const filteredItems = getFilteredItems(query, items);

    return (
        <div>
        <Head/>
        <div className="App">
            <label>Search</label>
            <input type="text" onChange={(e) => setQuery(e.target.value)}/>
            <ul>
                {filteredItems.map((value) => (
                    <h1 key={value.name}>{value.name}</h1>
                ))}
            </ul>
    
        </div>
        </div>
     
      )
}



