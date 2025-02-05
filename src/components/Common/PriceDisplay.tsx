import React from 'react';
import { CurrencyFormat } from '@/utils/Currency';

const PriceDisplay: React.FC<{ value: number, decimals: number }> = ({value, decimals}) => {
    const formattedValue = (val: number, decimal: number) => {
        if (val === 0) return '0';
        const v = String(val).length;

        var diff = 0;
        var prefix = '0';
        var mv = String(val);
        if (v > decimal) {
            const lound = val / (10 ** decimal);
            const pre_str = String(lound).split('.')[0];
            prefix = CurrencyFormat(pre_str);
            
            if (String(lound).split('.').length < 2) return (
                <span className="text-[14px]">
                    {String(prefix).substring(0, 4)}
                </span>
            )
            mv = String(lound).split('.')[1] || ''
            const post_str = Number('0.' + mv).toString().length;
            diff = decimal - post_str;
        } else {
            diff = decimal - v;
        }

        if (diff > 3) {
            return (
                <span className="text-[14px]">
                    {prefix}.0<sub>{diff - 1}</sub>{String(mv).substring(0, 4)}
                </span>
            )
        } else {
            return (
                <span className="text-[14px]">
                    {prefix}.{'0'.repeat(diff)}{String(mv).substring(0, 4)}
                </span>
            )
        }
    }

    return (
        <>
            {formattedValue(value, decimals)}
        </>
    );
};

export default PriceDisplay;
