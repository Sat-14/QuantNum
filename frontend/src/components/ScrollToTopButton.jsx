import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);
    
    useEffect(() => {
        const toggleVisibility = () => {
            const scrolly = window.scrollY;
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const halfway = totalHeight / 2;
            
            if(scrollY > halfway){
                setVisible(true);
            }else{
                setVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        visible && (
        <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 bg-gray-600 text-white rounded-full shadow-lg z-50 backdrop-blur-xl bg-opacity-90 hover:bg-gray-700 hover:scale-105 transition-all duration-300 animate-pulse-glow"
            aria-label="Scroll to top"
        >
            <ArrowUp size={20} />
        </button>
        )
    );
};

export default ScrollToTopButton;
