import React, { useState } from 'react';
import { Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemButton, AppBar, Tabs, Tab, Toolbar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSelectedArea } from '../../store/slices/placeSlice';

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


function SelectBox() {
  const dispatch = useDispatch();
  const handleDateChange = (date) => {
    setLocalSearchCriteria((prev) => ({ ...prev, departureDate: date }));
  };

  const tourismTypes = ['관광지', '문화시설', '축제공연행사', '여행코스', '레포츠', '숙박', '쇼핑', '음식점'];
  const regions = [
    { code: "1", name: "서울" },
    { code: "2", name: "인천" },
    { code: "3", name: "대전" },
    { code: "4", name: "대구" },
    { code: "5", name: "광주" },
    { code: "6", name: "부산" },
    { code: "7", name: "울산" },
    { code: "8", name: "세종특별자치시" },
    { code: "31", name: "경기도" },
    { code: "32", name: "강원특별자치도" },
    { code: "33", name: "충청북도" },
    { code: "34", name: "충청남도" },
    { code: "35", name: "경상북도" },
    { code: "36", name: "경상남도" },
    { code: "37", name: "전북특별자치도" },
    { code: "38", name: "전라남도" },
    { code: "39", name: "제주도" }
  ];

  const [selectedTourismType, setSelectedTourismType] = useState('');
  const [selectedServiceClassification, setSelectedServiceClassification] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [displayedRegion, setDisplayedRegion] = useState('');

  const [open, setOpen] = useState(false);
  const [currentSetter, setCurrentSetter] = useState(null);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleOpen = (setter, options) => {
    setCurrentSetter(() => setter);
    setCurrentOptions(options);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = (option) => {
    currentSetter(option);
    handleClose();
  };

  const handleSearch = () => {
    setDisplayedRegion(selectedRegion);
    dispatch(setSelectedArea({ code: regions.find(r => r.name === selectedRegion)?.code, name: selectedRegion }));
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
    <LocalizationProvider dateAdapter={AdapterDayjs}>

    <Box sx={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 2,
      margin: '20px 0'
    }}>
      <AppBar position="static" color="" sx={{ width: '60%' }}>
        <Tabs 
          value={selectedTab} 
          onChange={handleTabChange} 
          aria-label="tabs" 
          variant="fullWidth" // Ensures tabs spread out evenly
          centered // Centers the tabs in the AppBar
        >
          <Tab label="지역별 관광정보" />
          <Tab label="통합 검색" />
          <Tab label="행사 검색" />
          <Tab label="숙박 검색" />
        </Tabs>
      </AppBar>
      {selectedTab === 0 && (
        <Box sx={{ width: '60%', textAlign: 'left', marginBottom: 2 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            지역별 관광정보
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ width: '150px', backgroundColor: '#f0f0f0', borderRight: '1px solid #ddd', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }} component="th" scope="row">
                    관광타입
                  </TableCell>
                  <TableCell sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{selectedTourismType}</span>
                    <Button variant="outlined" onClick={() => handleOpen(setSelectedTourismType, tourismTypes)}>관광타입 선택</Button>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ width: '150px', backgroundColor: '#f0f0f0', borderRight: '1px solid #ddd', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }} component="th" scope="row">
                    지역
                  </TableCell>
                  <TableCell sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{displayedRegion && `광역시/도 : ${displayedRegion}`}</span>
                    <Button variant="outlined" onClick={() => handleOpen(setSelectedRegion, regions.map(region => region.name))}>지역 선택</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, paddingTop: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSearch}>검색</Button>
            <Button variant="contained" color="secondary" onClick={() => {
              setSelectedTourismType('');
              setSelectedServiceClassification('');
              setSelectedRegion('');
              setDisplayedRegion('');
            }}>선택 초기화</Button>
          </Box>
          <Typography variant="h7" component="div" sx={{ fontWeight: 'bold' }}>
            검색 데이터
    </Typography>

        </Box>
      )}
      {selectedTab === 1 && (
        <Box sx={{ width: '60%', textAlign: 'left', marginBottom: 2 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            통합 검색
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ width: '150px', backgroundColor: '#f0f0f0', borderRight: '1px solid #ddd', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }} component="th" scope="row">
                    서비스분류
                  </TableCell>
                  <TableCell sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{selectedTourismType}</span>
                    <Button variant="outlined" onClick={() => handleOpen(setSelectedTourismType, tourismTypes)}>서비스 분류 선택</Button>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ width: '150px', backgroundColor: '#f0f0f0', borderRight: '1px solid #ddd', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }} component="th" scope="row">
                    지역
                  </TableCell>
                  <TableCell sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{displayedRegion && `광역시/도 : ${displayedRegion}`}</span>
                    <Button variant="outlined" onClick={() => handleOpen(setSelectedRegion, regions.map(region => region.name))}>지역 선택</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, paddingTop: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSearch}>검색</Button>
            <Button variant="contained" color="secondary" onClick={() => {
              setSelectedTourismType('');
              setSelectedServiceClassification('');
              setSelectedRegion('');
              setDisplayedRegion('');
            }}>선택 초기화</Button>
          </Box>
          <Typography variant="h7" component="div" sx={{ fontWeight: 'bold' }}>
            검색 데이터
    </Typography>
        </Box>
        
      )}
      {selectedTab === 2 && (
        <Box sx={{ width: '60%', textAlign: 'left', marginBottom: 2 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            행사 검색
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ width: '150px', backgroundColor: '#f0f0f0', borderRight: '1px solid #ddd', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }} component="th" scope="row">
                    지역
                  </TableCell>
                  <TableCell sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{selectedTourismType}</span>
                    <Button variant="outlined" onClick={() => handleOpen(setSelectedTourismType, tourismTypes)}>지역 선택</Button>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ width: '150px', backgroundColor: '#f0f0f0', borderRight: '1px solid #ddd', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }} component="th" scope="row">
                    시작일
                  </TableCell>
                  <TableCell sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <DatePicker
                label="시작 날짜"
                onChange={handleDateChange}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: '150px', backgroundColor: '#f0f0f0', borderRight: '1px solid #ddd', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }} component="th" scope="row">
                    종료일
                  </TableCell>
                  <TableCell sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <DatePicker
                label="종료 날짜"
                onChange={handleDateChange}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, paddingTop: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSearch}>검색</Button>
            <Button variant="contained" color="secondary" onClick={() => {
              setSelectedTourismType('');
              setSelectedServiceClassification('');
              setSelectedRegion('');
              setDisplayedRegion('');
            }}>선택 초기화</Button>
          </Box>
          <Typography variant="h7" component="div" sx={{ fontWeight: 'bold' }}>
            검색 데이터
    </Typography>
        </Box>
      )}
      {selectedTab === 3 && (
        <Box sx={{ width: '60%', textAlign: 'left', marginBottom: 2 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            숙박 검색
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ width: '150px', backgroundColor: '#f0f0f0', borderRight: '1px solid #ddd', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }} component="th" scope="row">
                    지역
                  </TableCell>
                  <TableCell sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{displayedRegion && `광역시/도 : ${displayedRegion}`}</span>
                    <Button variant="outlined" onClick={() => handleOpen(setSelectedRegion, regions.map(region => region.name))}>지역 선택</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: '150px', backgroundColor: '#f0f0f0', borderRight: '1px solid #ddd', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }} component="th" scope="row">
                    숙박 선택
                  </TableCell>
                  <TableCell sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{selectedTourismType}</span>
                    <Button variant="outlined" onClick={() => handleOpen(setSelectedTourismType, tourismTypes)}>숙박 선택</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, paddingTop: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSearch}>검색</Button>
            <Button variant="contained" color="secondary" onClick={() => {
              setSelectedTourismType('');
              setSelectedServiceClassification('');
              setSelectedRegion('');
              setDisplayedRegion('');
            }}>선택 초기화</Button>
          </Box>
          <Typography variant="h7" component="div" sx={{ fontWeight: 'bold' }}>
            검색 데이터
    </Typography>
        </Box>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>선택</DialogTitle>
        <DialogContent>
          <List>
            {currentOptions.map((option, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => handleSelect(option)}>
                  {option}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">취소</Button>
          <Button onClick={handleClose} color="success">확인</Button>
        </DialogActions>
      </Dialog>
    </Box>
    
    </LocalizationProvider>
    </div>
  );
}

export default SelectBox;
