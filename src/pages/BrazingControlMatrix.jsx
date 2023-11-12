import React from 'react'
import { ServiceGetColsMatrix, ServiceGetDataMatrix } from '../Service';
import { useState, useEffect } from 'react'
import { CircularProgress, Grid, IconButton, InputBase } from '@mui/material';
import IconCircle from '@mui/icons-material/Brightness1';
import { Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
export default function BrazingControlMatrix() {
    const [coldefault, setcoldefault] = useState([
        { refItem: 'ลำดับ' },
        { refItem: 'Code.' },
        { refItem: 'Name.' },
        { refItem: 'DCU & Subcontract' }
    ]);
    const [datadefault, setdatadefault] = useState([]);
    const [datas, setdatas] = useState([]);
    const [course, setcourse] = useState([]);
    const [cols, setcols] = useState([]);
    const [loading, setloading] = useState(true);
    const initial = async () => {
        setloading(true);
        const fetchCourse = await ServiceGetColsMatrix();
        setcols([...fetchCourse])
        setcourse(fetchCourse);
        const matrix = await ServiceGetDataMatrix();
        setdatadefault(matrix);
        setdatas(matrix);
        setloading(false);
    }

    const filterData = (search) => {
        const filteredRows = datadefault.filter((row) => {
            return row.type.toLowerCase().includes(search.toLowerCase()) || (row.index + '').includes(search.toLowerCase()) || row.empcode.toLowerCase().includes(search.toLowerCase()) || row.fullName.toLowerCase().includes(search.toLowerCase())
        });
        if (search.length) {
            setdatas(filteredRows);
        } else {
            setdatas(datadefault)
        }
    }
    useEffect(() => {
        initial();
        return () => {

        };
    }, []);
    return (
        <div className='bg-white h-[92.5%]'>
            <Grid container p={3} gap={1} className='bg-[#2c3842c2]  h-[100%]'>
                <Grid item xs={12} className='flex justify-end'>
                    <Paper
                        component="form"
                        sx={{ p: '2px 8px', display: 'flex', alignItems: 'center', width: 250 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="ค้นหาสิ่งที่คุณต้องการ"
                            inputProps={{ 'aria-label': 'search google maps' }}
                            onChange={(e) => filterData(e.target.value)}
                        />
                        <IconButton type="button" sx={{ p: '0px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={12} className='wrapper'>
                    <Paper className='h-full p-2'>
                        <table className='tbMatrix h-[50%] overflow-y-scroll'>
                            <thead>
                                <tr>
                                    {
                                        [...coldefault, ...cols].map((item, index) => {
                                            return <td key={index}>{item.refItem}</td>
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ? <tr><td colSpan={12} className='text-center'><CircularProgress /></td></tr> : (
                                        datas.map((item, index) => {
                                            return <tr key={index}>
                                                <td className='text-center'>{item.index}</td>
                                                <td className='text-center'>{item.empcode}</td>
                                                <td className='pl-4'>{item.fullName}</td>
                                                <td className='text-center'>{item.type}</td>
                                                {
                                                    course.map((el, index) => {
                                                        var everTrainee = typeof item.course[el.code] != 'undefined' ? <IconCircle className='text-[14px]' /> : '';
                                                        return <td className='text-center'>{everTrainee}</td>
                                                    })
                                                }
                                            </tr>;
                                        })
                                    )
                                }
                            </tbody>
                        </table>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
