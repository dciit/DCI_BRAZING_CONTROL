import React, { useState } from 'react'
import { Avatar, IconButton, Stack, Typography } from '@mui/material';
import logo from '../assets/daikin.ico';
import TableRowsIcon from '@mui/icons-material/TableRows';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
export default function AppbarComponent() {
    let BASE_PATH = import.meta.env.VITE_PATH;
    const reducer = useSelector(state => state.reducer)
    const dispatch = useDispatch();
    const [active, setactive] = useState(typeof reducer.menu != 'undefined' ? reducer.menu : '');
    console.log(active)
    const navigate = useNavigate();
    const VITE_PATH = import.meta.env.VITE_PATH;
    const handleLogout = () => {
        if (confirm('คุณต้องการออกจากระบบ ใช่หรือไม่ ?')) {
            navigate(`${BASE_PATH}/`)
            dispatch({ type: 'LOGIN', payload: { login: false ,menu:''} });
        }
    }
    return (
        <div className="bg-[#1a2732] h-[7.5%] flex justify-between gap-3 items-center pl-[1em] font-semibold text-[2em] text-white">
            <div className='flex items-center gap-3'>
                <img src={logo} className='w-[35px]' />
                <Typography className="text-[10px] font-semibold xs:text-[12px] sm:text-[14px] md:text-[18px] lg:text-[24px]">DCI Brazing Control</Typography>
            </div>
            <Stack direction={'row'} gap={2}>
                <Stack className={` border-2 px-3 cursor-pointer ${active == '' ? 'opacity-100' : 'opacity-50'}`} onClick={() => {
                    console.log('home')
                    navigate(`${VITE_PATH}/`)
                    dispatch({ type: 'SET_MENU', payload: '' })
                    setactive('')
                }}>
                    <IconButton><TableRowsIcon className='text-white' /></IconButton>
                    <span className='text-[14px]'>ตาราง</span>
                </Stack>
                <Stack className={`border-2 px-3 cursor-pointer ${active == 'matrix' ? 'opacity-100' : 'opacity-50'}`} onClick={() => {
                    console.log('active')
                    navigate(`${VITE_PATH}/matrix`)
                    dispatch({ type: 'SET_MENU', payload: 'matrix' })
                    setactive('matrix')
                }}>
                    <IconButton><BlurOnIcon className='text-white' /></IconButton>
                    <span className='text-[14px]'>เมตทริก</span>
                </Stack>
            </Stack>
            <div className='flex items-center gap-3 text-white pl-8 pr-4'>


                <Stack direction={'row'} alignItems={'center'} onClick={handleLogout}>
                    <span className='text-[14px]'>{reducer.name}</span>
                    <IconButton>
                        <Avatar src={`http://dcihrm.dci.daikin.co.jp/PICTURE/${reducer.empcode}.JPG`} />
                    </IconButton>
                </Stack>

            </div>
        </div>
    )
}
