import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { PokemonURL } from '../../App';
import "./Pokemon.css"
import { useState } from 'react';
import CardPokemon from '../cardPokemon/CardPokemon';
import { TextField, Button, Card, CardContent, CircularProgress } from '@mui/material';

export interface PokemonProps {
	pokemons: PokemonURL[]
	setPokemons: Dispatch<SetStateAction<PokemonURL[]>>;
}

export default function Pokemon(props: PokemonProps) {

	const [pokemon, setPokemon] = useState<Pokemon>();
	const [loadPokemon, setLoadPokemon] = useState<boolean>(true);
	const [search, setSearch] = useState<string>("");
	useEffect(() => {
		getPokemons();
	}, [])

	async function getPokemons() {
		const result = await fetch('https://pokeapi.co/api/v2/pokemon',
			{
				method: "GET",
				headers: {
					'Content-Type': 'application/json'
				}
			}
		).then(data => {
			return data.json()
		}).then(response => {
			props.setPokemons(response.results);
		})
	}

	const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setSearch(e.target.value);
	}

	function clearFilter() {
		setSearch('');
	}

	function showPokemon(pokemonID: number) {
		fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`).then(
			data => data.json()
		).then(
			response => {
				setPokemon({
					name: response.name,
					types: response.types[0].type.name,
					picture: response.sprites.front_default
				})
				setLoadPokemon(false);
			}
		).catch(() => {
			console.log('erreur');
			setLoadPokemon(true);
		})
	}
	return (
		<div className='container'>
			<div className='container-input'>
				<TextField
					className='textfield-search'
					value={search}
					id="outlined-basic"
					label="Search pokemon"
					variant="outlined"
					onChange={() => onChange(event)} />
				<Button
					className='btn-search'
					onClick={clearFilter}
					variant='contained'>x</Button>
			</div>
			<div className='container-list'>
				{props.pokemons.filter((pokemon: PokemonURL) => {
					return pokemon.name.match(search);
				}).map((pokemon: PokemonURL, index: number) => {
					return <li key={index + 1} onClick={() => showPokemon(index + 1)}> {pokemon.name}</li>
				})}
			</div>
			{pokemon ?
				<CardPokemon pokemon={pokemon} loadPokemon={loadPokemon} /> : ''
			}
		</div>
	)
}
