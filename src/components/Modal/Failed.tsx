import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Link from 'next/link';
import "@/styles/state.css";

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

export default function FailedModal({ open, handleOpen, data, href }: { open: boolean, handleOpen: (state: boolean) => void, data: any, href: string }) { 

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
                    <div className='icon-failed-show flex justify-center w-[100px] mb-[24px] h-[100px] bg-[#EB3D4D] rounded-full mx-auto'>
                        <Image src={`/images/icon-svg/failed.svg`} alt={`user-photo`} width={66} height={66} />
                    </div>
                    <Typography gutterBottom variant="h3" className='mb-[16px] font-bold text-[32px] text-[#EB3D4D]'>
                        Failed!
                    </Typography>
                    <p className='mb-[0] mx-[50px]  text-[16px] text-[#D2D2D5]'>
                        Unfortunately, your transaction could not be processed.
                    </p>
                </div>
                <div className='text-left'>
                    <Typography gutterBottom variant="h3" className='font-bold text-[24px] mb-[24px] text-[#E9E9EA]'>
                        Possible Reasons
                    </Typography>
                    <ul className='grid gap-[7px] grid-cols-1 p-[10px]'>
                        <li className='flex  items-center bg-transparent'>
                            <FiberManualRecordIcon className='text-[7px] mr-[10px] text-[#E9E9EA]' />
                            <span className='text-[#E9E9EA] text-[16px]'>Insufficient funds for gas fees</span>
                        </li>
                        <li className='flex  items-center bg-transparent'>
                            <FiberManualRecordIcon className='text-[7px] mr-[10px] text-[#E9E9EA]' />
                            <span className='text-[#E9E9EA] text-[16px]'>Network congestion</span>
                        </li>
                        <li className='flex  items-center bg-transparent'>
                            <FiberManualRecordIcon className='text-[7px] mr-[10px] text-[#E9E9EA]' />
                            <span className='text-[#E9E9EA] text-[16px]'>Smart contract issue</span>
                        </li>
                        {/* <li className='flex  items-center bg-transparent'>
                            <FiberManualRecordIcon className='text-[7px] mr-[10px] text-[#E9E9EA]' />
                            <Link href={href}><span className='text-[#FF2100] text-[16px]'>Retry</span></Link>
                        </li> */}
                        <li className='flex  items-center bg-transparent'>
                            <FiberManualRecordIcon className='text-[7px] mr-[10px] text-[#E9E9EA]' />
                            <Link href={`/liquidity`}><span className='text-[#FF2100] text-[16px]'>Contact support</span></Link>
                        </li>
                    </ul>
                </div>
            </Box>
        </Modal>
    );
}