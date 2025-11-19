const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-500 p-4 mt-8 border-t border-gray-700">
            <div className="container mx-auto text-center text-sm">
                <p>&copy; {new Date().getFullYear()} Aplicación Buscador de Personajes. Desarrollado con React, Vite y Tailwind CSS.</p>
            </div>
        </footer>
    );
};

export default Footer;