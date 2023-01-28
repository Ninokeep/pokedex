import { Card, CardMedia, CardContent, Typography, CircularProgress } from '@mui/material';
import Pokemon from '../pokemons/Pokemon';
import './CardPokemon.css';
import React, { useState, useEffect } from 'react';
import { pokemonType } from '../../utils/PokemonType';

export interface Pokemon {
    name: string;
    picture: string;
    types: string
}

export interface PokemonProps {
    pokemon: Pokemon;
    loadPokemon: boolean;
}


export default function CardPokemon(props: PokemonProps) {

    const [backgroundColor, setBackgroundColor] = useState<string>('none');

    useEffect(() => {
        setBackgroundColor(pokemonType[props.pokemon.types]);

    }, [props.pokemon.types]);


    return (
        <Card sx={{ maxWidth: 345 }} variant='outlined' style={{ flex: 1 }}>
            {props.loadPokemon ? <CircularProgress /> : <React.Fragment>
                <CardMedia
                    sx={{ height: 300 }}
                    image={props.pokemon?.picture}
                    title={props.pokemon?.name}
                />
                <CardContent style={{ backgroundColor }}>
                    <Typography
                        gutterBottom variant="h4"
                        align='center'
                        style={{ textTransform: 'capitalize', color: 'white' }}
                        component="div">
                        {props.pokemon?.name}
                    </Typography>
                    <Typography
                        variant="h5"
                        align='center'
                        style={{ textTransform: 'capitalize', color: 'white' }}
                    >
                        {props.pokemon?.types}
                    </Typography>
                </CardContent></React.Fragment>}
        </Card>
    )
}