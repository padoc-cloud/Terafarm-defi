import React, { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import { io, Socket } from "socket.io-client";
import { MessageItem } from "@/types/menu";

interface SocketContextProps {
    socket: Socket;
    messages: MessageItem[];
}

const SocketProviderContext = createContext<SocketContextProps>({} as SocketContextProps);

export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<any | null>(null);
    const [message, setMessages] = useState<MessageItem[]>([] as MessageItem[]);

    useEffect(() => {
        const newSocket = io();

        setSocket(newSocket);

        newSocket.on('message', (msg: MessageItem) => {
            // console.log(" new message received: ", msg)
            setMessages((prevMessages) => [...prevMessages, msg])
        });

        return () => {
            newSocket.close(); // Cleanup on unmount
        };
    }, []);

    return (
        <SocketProviderContext.Provider value={{ socket, messages: message }}>
            {children}
        </SocketProviderContext.Provider>
    );
};

// Hook to access WebRTC context in any component
export const useSocket = () => {
    return useContext(SocketProviderContext);
};

export default SocketProviderContext
