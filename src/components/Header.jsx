const Header = ({ showFavorites, favoritesCount, onToggleView }) => {
    return (
        <header className="bg-gray-900 text-white p-4 shadow-xl border-b-4 border-green-500">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold text-green-400 flex items-center">
                     <img
                     src="/images/iconrick.png"
                     alt="Icono de Rick"
                     className="w-8 h-8 mr-2"
                     />
                     Buscador de Personajes de Rick y Morty
                </h1>
                <button
                    onClick={onToggleView}
                    className={`px-4 py-2 rounded-lg font-semibold transition duration-300 flex items-center ${
                        showFavorites ? 'bg-white text-green-700 hover:bg-gray-200' : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                >
                    <span className="text-xl mr-2">⭐</span>
                    {showFavorites ? 'Ver Búsqueda' : `Ver Favoritos (${favoritesCount})`}
                </button>
            </div>
        </header>
    );
};

export default Header;