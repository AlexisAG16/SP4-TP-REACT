import React, { useMemo } from 'react';
import CardPersonajes from './CardPersonajes';

const ListaPersonajes = ({ personajes, favoritos, onToggleFavorite, loading, error }) => {
    
    // useMemo
    const memoizedPersonajes = useMemo(() => personajes, [personajes]);

    if (loading) {
        return <p className="text-center text-xl text-green-400 mt-8">Cargando personajes...</p>;
    }

    if (error) {
        return <p className="text-center text-xl text-red-500 mt-8">{error}</p>;
    }

    if (memoizedPersonajes.length === 0) {
        return <p className="text-center text-xl text-gray-500 mt-8">Usa el formulario para buscar por nombre o ID.</p>;
    }

    const isPersonajeFavorite = (id, source) => favoritos.some(fav => fav.id === id && fav.source === source);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {memoizedPersonajes.map(personaje => (
                <CardPersonajes
                    key={`${personaje.source}-${personaje.id}`}
                    personaje={personaje}
                    isFavorite={isPersonajeFavorite(personaje.id, personaje.source)}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    );
};

export default ListaPersonajes;