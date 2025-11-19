const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
            <div className="flex flex-col items-center">
                <div 
                    className="w-16 h-16 border-4 border-t-4 border-t-green-500 border-gray-700 rounded-full animate-spin"
                    role="status"
                >
                </div>
                <p className="text-xl text-green-400 mt-4">Buscando personajes...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;