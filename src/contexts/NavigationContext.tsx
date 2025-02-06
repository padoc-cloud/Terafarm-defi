import React, { createContext, useState, ReactNode } from 'react';

interface NavigationContextProps {
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
}

const NavigationContext = createContext<NavigationContextProps | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoading, setLoading] = useState(false);

    return (
        <NavigationContext.Provider value={{ isLoading, setLoading }}>
            {children}
        </NavigationContext.Provider>
    );
};


export default NavigationContext
