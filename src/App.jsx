import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import FormularioBusqueda from './components/personajes/FormularioBusqueda';
import ListaPersonajes from './components/personajes/ListaPersonajes';
import ListaFavoritos from './components/favoritos/ListaFavoritos';
import LoadingSpinner from './components/LoadingSpinner';
import { useAppLogic } from './hooks/useAppLogic'; 

function App() {
    const {
        personajes,
        favoritos,
        loading,
        error,
        showFavorites,
        
        nameTerm,
        quantityTerm,
        searchMode,

        handleSearch,
        handleToggleView,
        handleToggleFavorite,
    } = useAppLogic();
    
    const getSubtitleText = () => {
        if (showFavorites) return '⭐ Mis Personajes Favoritos de Rick and Morty';
        
        let searchInfo = '';

        if (searchMode === 'combined') {
            searchInfo = `Búsqueda Combinada: Nombre "${nameTerm}" Limitado a ${quantityTerm}`;
        } else {
             searchInfo = `Inicia una Búsqueda Combinada (Nombre y Límite)`;
        }
        
        return `🔍 ${searchInfo}`;
    };


    return (
        <div className="min-h-screen flex flex-col bg-gray-950 text-white">
            <ToastContainer position="bottom-right" theme="dark" />
            
            <Header 
                showFavorites={showFavorites}
                favoritesCount={favoritos.length}
                onToggleView={handleToggleView}
            />

            <main className="grow container mx-auto p-4">
                
                {!showFavorites && (
                    <>
                        <FormularioBusqueda onSearch={handleSearch} />
                    </>
                )}

                <h2 className="text-3xl font-bold text-center mt-6 mb-4 text-green-400">
                    {getSubtitleText()}
                </h2>
                
                {showFavorites ? (
                    <ListaFavoritos 
                        favoritos={favoritos} 
                        onToggleFavorite={handleToggleFavorite} 
                    />
                ) : (
                    <ListaPersonajes
                        personajes={personajes} 
                        favoritos={favoritos}
                        onToggleFavorite={handleToggleFavorite}
                        loading={loading}
                        error={error}
                    />
                )}

            </main>

            <Footer />
            
            {loading && <LoadingSpinner />}
        </div>
    );
}

export default App;