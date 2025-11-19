import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useFetchData } from './useFetchData'; 

const RICK_AND_MORTY_URL = import.meta.env.VITE_RICK_AND_MORTY_URL;

const getInitialFavorites = (key, defaultValue) => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(key);
        return saved !== null ? JSON.parse(saved) : defaultValue;
    }
    return defaultValue;
};

export const useAppLogic = () => {
    const FAVORITES_KEY = 'seriesFavoritos';

    const [showFavorites, setShowFavorites] = useState(false);
    
    const [searchConfig, setSearchConfig] = useState({
        mode: 'none',
        nameQuery: '',
        quantityQuery: 0,
    });
    
    const [favoritos, setFavoritos] = useState(() => 
        getInitialFavorites(FAVORITES_KEY, [])
    );

    useEffect(() => {
        const rnM_favoritos = favoritos.filter(fav => fav.source === 'Rick and Morty');
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(rnM_favoritos));
    }, [favoritos]);


    const { data: personajes, loading, error } = useFetchData(RICK_AND_MORTY_URL, searchConfig); 

    const handleToggleView = () => {
        setShowFavorites(prev => !prev);
    };

    const handleSearch = (mode, name, quantity) => {
        setSearchConfig({
            mode,
            nameQuery: name,
            quantityQuery: quantity,
        });
    };

    const handleToggleFavorite = (personaje) => {
        const isCurrentlyFavorite = favoritos.some(fav => fav.id === personaje.id && fav.source === personaje.source);
        
        if (isCurrentlyFavorite) {
            const newFavoritos = favoritos.filter(fav => !(fav.id === personaje.id && fav.source === personaje.source));
            setFavoritos(newFavoritos);
            toast.error(`❌ ${personaje.name} eliminado de favoritos.`, { autoClose: 2000 });
        } else {
            setFavoritos([...favoritos, personaje]);
            toast.success(`✅ ${personaje.name} agregado a favoritos!`, { autoClose: 2000 });
        }
    };
    
    return {
        personajes,
        favoritos,
        loading,
        error,
        
        nameTerm: searchConfig.nameQuery,
        quantityTerm: searchConfig.quantityQuery,
        searchMode: searchConfig.mode,
        
        showFavorites,
        
        handleSearch,
        handleToggleView,
        handleToggleFavorite,
    };
};