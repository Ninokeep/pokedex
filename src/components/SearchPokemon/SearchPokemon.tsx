import { useState } from 'react';
import './SearchPokemon.css';



export default function SearchPokemon() {

    const [search, setSearch] = useState<string>("")

    return (
        <input className="input" placeholder="search a pokemon..." value={search} />
    )
}