import { useMessageAnimation } from "@/hooks/useMessageAnimation";
import { MessageItem } from "@/types/menu";
import { Typography } from '@mui/material';
import Image from "next/image";

import { WalletAddressFormat } from "@/utils/format";

const ShowMessagecomponent = ({ msg1, msg2 }: { msg1: MessageItem, msg2: MessageItem }) => {
    const { isAnimating: isAnimating1, isVisible: isVisible1 } = useMessageAnimation(msg1.id);
    const { isAnimating: isAnimating2, isVisible: isVisible2 } = useMessageAnimation(msg2.id);

    return (
        <div className='absolute md:right-[20px] right-1/2 transform md:translate-x-1 flex-wrap-reverse translate-x-1/2 bottom-[-35px] min-w-[320px] flex md:flex-row flex-col md:jusify-between items-center gap-[10px]'>
            {(msg1.id && isVisible1) && (
                <div className={`top-box relative text-left text-white py-[4px] px-[12px] md:inline-flex hidden w-fit min-w-[150px] rounded ${isAnimating1 ? 'animate-refine-slide' : ''}`} style={{ backgroundColor: msg1.type }}>
                    <Image src="/favicon.svg" alt="logo" width={14} height={14} className='mr-[8px]' />
                    <Typography variant='body2'>{WalletAddressFormat(msg1.address as string) + " " + msg1.message}</Typography>
                </div>
            )}
            {(msg2.id && isVisible2) && (
                <div className={`top-box relative text-left text-white py-[4px] px-[12px] inline-flex w-fit min-w-[150px] rounded ${isAnimating2 ? 'animate-refine-slide': ''}`} style={{ backgroundColor: msg2.type }}>
                    <Image src="/favicon.svg" alt="logo" width={14} height={14} className='mr-[8px]' />
                    <Typography variant='body2'>{WalletAddressFormat(msg2.address as string) + " " + msg2.message}</Typography>
                </div>
            )}
        </div>
    );
};

export default ShowMessagecomponent;