import React, { useState } from 'react';

const FormularioBusqueda = ({ onSearch }) => {
    const [nameInput, setNameInput] = useState('');
    const [quantityInput, setQuantityInput] = useState('');
    
    const handleCombinedSearch = (e) => {
        e.preventDefault();
        
        const trimmedName = nameInput.trim();
        const quantity = parseInt(quantityInput, 10);
        
        if (!trimmedName || isNaN(quantity) || quantity <= 0) {
            alert("Para la búsqueda combinada, por favor ingresa un Nombre Válido y una Cantidad Válida (ej: Rick y 5).");
            return;
        }

        onSearch('combined', trimmedName, quantity);
    };
    
    return (
        <form onSubmit={handleCombinedSearch} className="flex flex-col gap-4 p-4 max-w-2xl mx-auto my-6 bg-gray-800 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-green-400 border-b border-gray-700 pb-2">Búsqueda Combinada (Nombre y Límite)</h3>

            <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="1. Ingresa el nombre a buscar (ej: Rick)"
                className="p-3 border-2 border-gray-700 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />

            <input
                type="number"
                value={quantityInput}
                onChange={(e) => setQuantityInput(e.target.value)}
                placeholder="2. Límite de resultados a mostrar (ej: 5, Máx 50)"
                min="1"
                max="50"
                className="p-3 border-2 border-gray-700 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
            
            <div className="pt-2 border-t border-gray-700 flex flex-col items-center">
                <p className="text-sm text-gray-400 mb-2">Busca Personajes por Nombre y Limita la Cantidad de Resultados.</p>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                    Buscar {nameInput || '"{Nombre}"'} Y Cantidad de {quantityInput || '"{Cantidad}"'}
                </button>
            </div>
            
        </form>
    );
};

export default FormularioBusqueda;