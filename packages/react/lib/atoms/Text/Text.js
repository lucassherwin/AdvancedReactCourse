import React from 'react';
import { FontSize } from '@Project1/foundation';

const Text = ({ size = FontSize.base, children }) => {
    const className = `dse-text dse-text dse-text-${size}`;
    return React.createElement("p", { className: className }, children);
};

export { Text as default };
//# sourceMappingURL=Text.js.map
