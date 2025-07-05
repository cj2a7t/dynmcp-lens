import React from 'react';
import * as Icons from '@ant-design/icons';

interface IconRendererProps {
    iconName: string;
    size?: number;
}

const IconRenderer: React.FC<IconRendererProps> = ({ iconName, size }) => {
    const IconComponent = (Icons as any)[iconName];
    if (!IconComponent) {
        return null;
    }
    return <IconComponent style={{ fontSize: size }} />;
};
export default IconRenderer;
