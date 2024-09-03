import { BASE_PATH, auth } from 'auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface ProviderProps {
    children: React.ReactNode;
}

const Provider = async ({ children }: ProviderProps) => {
    const session = await auth();
    return (
        <SessionProvider basePath={BASE_PATH} session={session}>
            {children}
        </SessionProvider>
    );
};

export default Provider;
