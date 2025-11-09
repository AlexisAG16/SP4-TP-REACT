const CardPersonajes = ({ personaje, isFavorite, onToggleFavorite }) => {
    const { 
        // eslint-disable-next-line no-unused-vars
        id, 
        name, 
        species, 
        origin, 
        image, 
        // eslint-disable-next-line no-unused-vars
        source,
        status, 
        gender
    } = personaje;
    
    const buttonText = isFavorite ? '★ Quitar de Favoritos' : '☆ Agregar a Favoritos';
    
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'alive': return 'bg-green-500';
            case 'dead': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };
    
    return (
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition duration-300 border-2 border-gray-700 relative">
            
            {status && (
                <span className={`absolute top-2 right-2 px-3 py-1 text-xs font-bold text-white rounded-full shadow-md ${getStatusColor(status)}`}>
                    {status}
                </span>
            )}
            
            <img 
                src={image} 
                alt={name} 
                className="w-full h-48 object-cover object-top" 
                onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/200?text=No+Image"; }}
            />
            <div className="p-4">
                <h3 className="text-2xl font-bold mb-1 text-white">{name}</h3>
                <p className="text-xs font-semibold text-green-400 mb-3 border-b border-gray-700 pb-2">Fuente: Rick and Morty</p> 
                
                <div className="text-sm mb-3 text-gray-300">
                    <p>**Especie:** {species || 'N/A'}</p>
                    {gender && <p>**Género:** {gender}</p>}
                    <p>**Ubicación:** {origin || 'N/A'}</p>
                </div>

                <button
                    onClick={() => onToggleFavorite(personaje)}
                    className={`w-full py-2 rounded-lg font-semibold text-sm transition duration-300 ${
                        isFavorite 
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default CardPersonajes;