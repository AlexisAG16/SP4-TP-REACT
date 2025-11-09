import { useState, useEffect } from 'react';
import axios from 'axios';

const normalizeData = (data) => {
    if (!data) return [];
    
    const dataArray = Array.isArray(data) ? data : [data];

    return dataArray.map(item => {
        return {
            id: item.id,
            name: item.name,
            image: item.image,
            species: item.species,
            origin: item.origin?.name || 'Unknow Location',
            source: 'Rick and Morty',
            status: item.status, 
            gender: item.gender 
        };
    });
};

export const useFetchData = (baseUrl, searchConfig = {}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const { mode, nameQuery = '', quantityQuery = 0 } = searchConfig;

    useEffect(() => {
        const fetchData = async () => {
            const trimmedName = nameQuery.trim();
            const quantity = parseInt(quantityQuery, 10);
            
            if (mode !== 'combined' || !trimmedName || isNaN(quantity) || quantity <= 0) {
                return setData([]);
            }
            
            setLoading(true);
            setError(null);
            
            let url = `${baseUrl}?name=${trimmedName}`;
            
            try {
                const response = await axios.get(url);
                let rawData = response.data;
                
                if (rawData.results) {
                    rawData = rawData.results;
                }
                
                let finalData = normalizeData(rawData);
                
                if (quantity > 0) {
                    finalData = finalData.slice(0, quantity);
                }
                
                setData(finalData);

            } catch (err) {
                console.error("Error al obtener datos:", err);
                let errorMessage = `No se encontraron resultados para "${trimmedName}".`;
                if (err.response && err.response.status === 404) {
                    errorMessage = `No se encontraron personajes que coincidan con "${trimmedName}".`;
                }
                setError(errorMessage);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [baseUrl, mode, nameQuery, quantityQuery, searchConfig]); 

    return { data, loading, error };
};