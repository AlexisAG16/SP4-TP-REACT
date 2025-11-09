import CardPersonajes from '../personajes/CardPersonajes';

const ListaFavoritos = ({ favoritos, onToggleFavorite }) => {
    if (favoritos.length === 0) {
        return (
            <p className="text-center text-lg text-gray-400 p-8">
                Aún no has agregado ningún personaje a favoritos.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {favoritos.map(personaje => (
                <CardPersonajes
                    key={`${personaje.source}-${personaje.id}`}
                    personaje={personaje}
                    isFavorite={true}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    );
};

export default ListaFavoritos;