import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import "@/styles/state.css";
import { ITransactionDetail } from '@/types/transaction';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60%",
    border: '1px solid rgba(255, 255, 255, 0.2) !important',
    borderRadius: '16px',
    boxShadow: 24,
    background: 'rgba(65, 65, 65, 0.2)',
    'max-width': "538px",
    'backdrop-filter': 'blur(25px)',
};

export default function CompletedModal({ open, handleOpen, data }: { open: boolean, handleOpen: (state: boolean) => void, data: ITransactionDetail }) { 

    return (
        <Modal
            open={open}
            onClose={() => handleOpen(false)}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
            sx={{
                'backdrop-filter': 'blur(40px)',
                'background-color': "unset !important"
            }}
            
        >
            <Box sx={style} className="lg:py-[40px] py-[36px] lg:px-[24px] px-[18px] text-center grid grid-cols-1 lg:gap-[24px] gap-[16px]">
                <div className='mb-[24px]'>
                    <div className='icon-completed-show flex justify-center w-[100px] mb-[24px] h-[100px] bg-[#22CAAD] rounded-full mx-auto'>
                        <Image src={`/images/icon-svg/completed.svg`} alt='mark completed' width={66} height={66} style={{ visibility: "unset" }} />
                    </div>
                    <Typography gutterBottom variant="h3" className='mb-[16px] font-bold text-[32px] text-[#22CAAD] text-center'>
                        Completed!
                    </Typography>
                    <p className='mb-[0] mx-[20px] text-center text-[16px] text-[#D2D2D5]'>
                        Your transaction was successful! Your Staking has been confirmed and added to the blockchain.
                    </p>
                </div>
                <div className='text-left'>
                    <Typography gutterBottom variant="h3" className='font-bold text-[24px] mb-[24px] text-[#E9E9EA]'>
                        Detail Transaction
                    </Typography>
                    <ul className='sub-card flex flex-col rounded-[8px] lg:rounded-[16px] grid gap-[8px] grid-cols-1 p-[16px]'>
                        <li className='flex justify-between item-list items-center py-[16px] bg-transparent'>
                            <span className='text-[#A5A5AB] mr-[6px] text-[16px] ml-2'>Amount</span>
                            <span className='text-[#E9E9EA] text-[16px]'>{data.amount}</span>
                        </li>
                        <li className='flex justify-between item-list items-center py-[16px] bg-transparent'>
                            <span className='text-[#A5A5AB] mr-[6px] text-[16px] ml-2'>Date & Time</span>
                            <span className='text-[#E9E9EA] text-[16px]'>{data.date}</span>
                        </li>
                        <li className='flex justify-between item-list items-center py-[16px] bg-transparent'>
                            <span className='text-[#A5A5AB] mr-[6px] text-[16px] ml-2'>Type of Transaction</span>
                            <span className='text-[#E9E9EA] text-[16px]'>{data.type}</span>
                        </li>
                        <li className='flex justify-between items-center py-[16px] bg-transparent'>
                            <span className='text-[#A5A5AB] mr-[6px] text-[16px] ml-2'>Status</span>
                            {data.status === 'success' && (
                                <Chip
                                    sx={{
                                        background: '#067647',
                                        fontSize: 12,
                                        fontWeight: 18
                                    }}
                                    label={data.status} className='py-[7px] px-[5px] text-white' />
                            )}
                            {data.status === 'Pending' && (
                                <Chip
                                    sx={{
                                        background: '#B54708',
                                        fontSize: 12,
                                        fontWeight: 18
                                    }}
                                    label={data.status} className='py-[7px] px-[5px] text-white' />
                            )}
                            {data.status === "reverted" && (
                                <Chip
                                    sx={{
                                        background: '#B42318',
                                        fontSize: 12,
                                        fontWeight: 18
                                    }}
                                    label="Failed" className='py-[7px] px-[5px] text-white' />
                            )}
                        </li>
                    </ul>
                </div>
            </Box>
        </Modal>
    );
}