import { useEffect, useState } from 'react';

export const useMessageAnimation = (message: any, resetDuration = 4000) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isVisible, setIsVisible] = useState(true); // Manage visibility of the message

    useEffect(() => {
        if (message) {
            console.log("message", message)
            setIsAnimating(true);
            const animationTimer = setTimeout(() => {
                setIsAnimating(false); // End animation after 2 seconds
            }, 900);

            // Set timeout for message removal after 8 seconds
            const removalTimer = setTimeout(() => {
                setIsVisible(false);
            }, resetDuration);

            return () => {
                clearTimeout(animationTimer); // Cleanup animation timeout
                clearTimeout(removalTimer); // Cleanup removal timeout
                setIsVisible(true); // Reset visibility when message changes
            };
        } else {
            setIsVisible(false); // If no message, remove the DOM element
        }
    }, [message, resetDuration]);

    return { isAnimating, isVisible };
};
