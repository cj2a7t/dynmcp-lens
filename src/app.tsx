import { ReactNode } from "react";
import { AliveScope } from "react-activation";

const App = ({ children }: { children: ReactNode }) => (
    <AliveScope>{children}</AliveScope>
);

export const rootContainer = (container: any) => <App>{container}</App>;
