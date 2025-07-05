import { ReactNode } from 'react';


const App = ({ children }: { children: ReactNode }) => (
    <>
        {children}
    </>
);

export const rootContainer = (container: any) => (
    <App>
        {container}
    </App>
);
