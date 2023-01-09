import React from 'react';
import { FontSize } from '@Project1/foundation';
export interface TextProps {
    size?: keyof typeof FontSize;
    children: any;
}
declare const Text: React.FC<TextProps>;
export default Text;
