import { Box, Grid, Stack, TableContainer, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, InputBase, CircularProgress, Select, MenuItem } from "@mui/material";
import AddHomeIcon from '@mui/icons-material/AddHome';
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { ServiceGetLineControl, ServiceGetUser } from "../Service";
import DialogViewUser from "../components/dialogViewUser";
function BrazingControl() {
    const [lineControl, setLineControl] = useState([]);
    const [lineSelected, setLineSelected] = useState('-');
    const [user, setUser] = useState([]);
    const [userDefault, setDefault] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openViewUser, setOpenViewUser] = useState(false);
    useEffect(() => {
        setLoading(true);
        init();
    }, [lineSelected]);
    async function init() {
        const line = await ServiceGetLineControl();
        setLineControl(line);
        const users = await ServiceGetUser(lineSelected);
        setLoading(false);
        setUser(users);
        setDefault(users);
    }
    const filterData = (search) => {
        const filteredRows = userDefault.filter((row) => {
            return row.courseCode.toLowerCase().includes(search.toLowerCase()) || row.courseName.toLowerCase().includes(search.toLowerCase()) || row.empcode.toLowerCase().includes(search.toLowerCase()) || row.fullname.toLowerCase().includes(search.toLowerCase()) || row.scheduleStart.toLowerCase().includes(search.toLowerCase()) || row.scheduleEnd.toLowerCase().includes(search.toLowerCase())
        });
        if (search.length) {
            setUser(filteredRows);
        } else {
            setUser(userDefault);
        }
    }

    return <div className="h-[92.5%]">
        <Grid container p={3} className="h-[100%] bg-[#1a27320a]">
            <Grid container className="bg-[#1a1a1a] text-white">
                <Grid item xs={9} className="flex items-center pl-3">
                    <Box className='flex items-center w-full'>
                        <Typography sx={{ p: '10px' }} className="text-white">Brazing Code : </Typography>
                        <Select value={lineSelected} size="small" className="text-white" sx={{
                            height: '1.75rem',
                            color: 'white',
                            fontSize: '14px',
                            width: '80%',
                            lineHeight: 2,
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#4effca'
                            },
                            '& .MuiSvgIcon-root': {
                                color: '#4effca'
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#4effca',
                            },
                            "&:hover": {
                                "&& fieldset": {
                                    border: "1px solid #4effca"
                                }
                            }
                        }} onChange={(e) => setLineSelected(e.target.value)}>
                            <MenuItem value={'-'}>--- ทั้งหมด ---</MenuItem>
                            {
                                lineControl.map(line => (
                                    <MenuItem key={line.courseCode} value={line.courseCode}>{line.courseName} ({line.courseCode})</MenuItem>
                                ))
                            }
                        </Select>
                    </Box>
                </Grid>
                <Grid item xs={3} p={2} className="flex justify-end">
                    <Paper
                        component="form"
                        sx={{ p: '2px 8px', display: 'flex', alignItems: 'center', width: '100%' }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="ค้นหาสิ่งที่คุณต้องการ"
                            onChange={(e) => filterData(e.target.value)}
                        />
                        <IconButton type="button" sx={{ p: '0px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Grid>
            </Grid>
            <Grid item xs={12} className=" h-full select-none">
                <TableContainer component={Paper} className="h-[90%] overflow-y-scroll mb-2 rounded-none">
                    <Table size="small" stickyHeader >
                        <TableHead >
                            <TableRow>
                                <TableCell className="text-center text-white">รหัสพนักงาน</TableCell>
                                <TableCell className="text-center text-white">ชื่อพนักงาน</TableCell>
                                <TableCell className="text-center text-white">Brazing Code</TableCell>
                                <TableCell className="text-center text-white">วันที่อบรม</TableCell>
                                <TableCell className="text-center text-white">วันที่หมดอายุ</TableCell>
                                <TableCell className="text-center text-white">Trainer</TableCell>
                                <TableCell className="text-center text-white">สถานะ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                loading
                                    ? <TableRow><TableCell colSpan={7} className="text-center"><CircularProgress /></TableCell></TableRow>
                                    : user.length ? user.map((item, index) => {
                                        return <TableRow key={index} className="cursor-pointer" onClick={() => setOpenViewUser(false)}>
                                            <TableCell className="text-center font-semibold">{item.empcode}</TableCell>
                                            <TableCell className="font-semibold">{item.fullname}</TableCell>
                                            <TableCell className="font-semibold">{item.courseName}</TableCell>
                                            <TableCell>{item.scheduleStart}</TableCell>
                                            <TableCell className="text-green-600 font-semibold">{item.expire}</TableCell>
                                            <TableCell>{item.trainer}</TableCell>
                                            <TableCell className="text-center">OK</TableCell>
                                        </TableRow>
                                    }) : <TableRow>
                                        <TableCell colSpan={7} className="text-center">ไม่พบข้อมูล</TableCell>
                                    </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box className='flex  justify-end '>
                    <Paper className="px-[14px] py-[1px]">
                        <Typography className="font-semibold text-[#9E9E9E]">จำนวน : <span className="text-[#1a2732]">{user.length}</span> รายชื่อ</Typography>
                    </Paper>
                </Box>
            </Grid>

        </Grid>

        <DialogViewUser open={openViewUser} close={setOpenViewUser} />
        {/* <Grid container>
                <Grid item xs={4}>
                    4
                </Grid>
                <Grid container xs={8}>
                    <Grid item xs={12}>
                        <Box>
                            {
                                [...Array(5)].map((item, index) => {
                                    return <Stack direction={'row'}>
                                        <AddHomeIcon />
                                        <Typography>Menu</Typography>
                                        <Typography>100 </Typography>
                                    </Stack>
                                })
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        data
                    </Grid>
                </Grid>
            </Grid> */}
    </div>
}
export default BrazingControl;