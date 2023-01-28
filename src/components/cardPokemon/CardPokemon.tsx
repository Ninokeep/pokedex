import { Card, CardMedia, CardContent, Typography, CircularProgress } from '@mui/material';
import Pokemon from '../pokemons/Pokemon';
import './CardPokemon.css';
import React, { useState, useEffect } from 'react';

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

    function setBackgroundColorCard(type: string) {
        switch (type) {
            case "grass": {
                setBackgroundColor("#4DAD5B");
                break;
            }
            case "fire": {
                setBackgroundColor('#E54222');
                break;
            }
            case "water": {
                setBackgroundColor("#30A7D7");
                break;
            }

            default: {
                break;
            }

        }
    }

    useEffect(() => {
        setBackgroundColorCard(props.pokemon.types);

    }, [setBackgroundColorCard]);


    return (
        <div style={{ margin: '0 5rem' }}>
            <Card sx={{ maxWidth: 345 }} style={{ backgroundColor: backgroundColor }}>
                {props.loadPokemon ? <CircularProgress /> : <React.Fragment>
                    <CardMedia
                        sx={{ height: 300 }}
                        image={props.pokemon?.picture}
                        title={props.pokemon?.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.pokemon?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {props.pokemon?.types}
                        </Typography>
                    </CardContent></React.Fragment>}
            </Card>
        </div>
    )
}