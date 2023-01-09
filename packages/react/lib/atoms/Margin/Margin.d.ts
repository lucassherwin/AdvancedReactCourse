import React from 'react';
import { Spacing } from '@Project1/foundation';
interface Margin {
    space?: keyof typeof Spacing;
    children: any;
    left?: boolean;
    right?: boolean;
    top?: boolean;
    bottom?: boolean;
}
declare const Margin: React.FC<Margin>;
export default Margin;
