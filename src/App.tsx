import { useEffect, useState } from 'react';
import './App.css'
import Pokemon from './components/pokemons/Pokemon';

export interface PokemonURL {
	name: string;
	url: string;
}

function App() {

	const [pokemons, setPokemons] = useState<PokemonURL[]>([]);

	return (
		<div >
			<Pokemon pokemons={pokemons} setPokemons={setPokemons} />
		</div>
	)
}

export default App
