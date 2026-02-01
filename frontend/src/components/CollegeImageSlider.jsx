import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Users } from 'lucide-react';

const CollegeImageSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const collegeImages = [
        { src: '/college_auditorium.png', title: 'State-of-the-Art Auditorium', description: 'Modern facilities for events and seminars' },
        { src: '/college_library.jpg', title: 'Modern Library', description: 'Extensive resources and study spaces' },
        { src: '/college_campus.jpg', title: 'Beautiful Campus', description: 'Lush green environment for learning' },
        { src: '/college_library2.jpg', title: 'Digital Learning Center', description: 'Technology-enabled education' },
        { src: '/college_festival.jpg', title: 'Vibrant Campus Life', description: 'Celebrating traditions and cultural festivals' },
        { src: '/college_building.jpg', title: 'Academic Excellence', description: 'Modern architecture with beautiful landscaping' }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % collegeImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + collegeImages.length) % collegeImages.length);
    };

    // Auto-slide effect
    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(nextSlide, 2500);
            return () => clearInterval(interval);
        }
    }, [isHovered, currentSlide]);

    return (
        <div
            className="w-full max-w-lg lg:max-w-2xl mx-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative">
                {/* Image Card */}
                <motion.div
                    layout
                    className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl bg-slate-100"
                >
                    <div className="relative w-full h-full bg-slate-900">
                        <AnimatePresence initial={false}>
                            <motion.img
                                key={currentSlide}
                                src={collegeImages[currentSlide].src}
                                alt={collegeImages[currentSlide].title}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </AnimatePresence>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full shadow-sm z-10 flex items-center space-x-2">
                        <Users className="w-3 h-3 text-orange-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Est. 2007</span>
                    </div>
                </motion.div>

                {/* Navigation Arrows (Inside Image) */}
                <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between z-20">
                    <button
                        onClick={prevSlide}
                        className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md text-white rounded-full border border-white/30 hover:bg-white hover:text-slate-900 transition-all active:scale-95"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md text-white rounded-full border border-white/30 hover:bg-white hover:text-slate-900 transition-all active:scale-95"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content Below Image (Mobile First Rule) */}
            <div className="mt-8 text-center px-4">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight">
                        {collegeImages[currentSlide].title}
                    </h3>
                    <p className="text-slate-500 font-medium leading-relaxed">
                        {collegeImages[currentSlide].description}
                    </p>
                </motion.div>

                {/* Progress Indicators */}
                <div className="flex justify-center space-x-2 mt-6">
                    {collegeImages.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-8 bg-slate-900' : 'w-2 bg-slate-200'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CollegeImageSlider;
