'use client';

import React, { useState } from 'react';
import { Grid, Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemButton, AppBar, Tabs, Tab, Toolbar } from '@mui/material';
import ItemContainer from '@/components/recommend/ItemContainer';
import styles from './RecommendTemplate.module.css';

const places = [
    { addr: "대구광역시 수성구 무학로 78", image: "/images/감영공원.jpg" },
    { addr: "대구광역시 수성구 무학로 78", image: "/images/송해공원.jpg" },
    { addr: "대구광역시 수성구 무학로 78", image: "/images/아양교.png" },
    { addr: "대구광역시 수성구 무학로 78", image: "/images/앞산.jpg" },
    { addr: "대구광역시 수성구 무학로 78", image: "/images/수성못.png" },
    { addr: "대구광역시 수성구 무학로 78", image: "/images/대구수목원.png" },
    { addr: "대구광역시 수성구 무학로 78", image: "/images/라이온즈파크.jpg" },
    { addr: "대구광역시 수성구 무학로 78", image: "/images/아쿠아리움.jpg" },
    { addr: "대구광역시 수성구 무학로 78", image: "/images/이월드.jpg" },
    { addr: "대구광역시 수성구 무학로 78", image: "/images/팔공산.png" },
    { addr: "대구광역시 수성구 무학로 78", image: "/images/근대역사.png" },
    { addr: "대구광역시 수성구 무학로 78", image: "/images/동화사.png" },
    { addr: "대구광역시 수성구 무학로 78", image: "/images/스파크랜드.png" }
];

const RecommendTemplate = () => {
    const [selectedTourismType, setSelectedTourismType] = useState('');

    const [selectedTab, setSelectedTab] = useState(0);
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
      };
    

    return (
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
                <Tab label="맞춤 여행지" />
                <Tab label="인기여행지" />
                <Tab label="조회수" />
              </Tabs>
            </AppBar>
            {selectedTab === 0 && (
                <Box sx={{ width: '60%', textAlign: 'center', marginBottom: 2 }}>
                    <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        맞춤 여행지
                    </Typography>
                    <Grid container spacing={2}>
                        <ItemContainer places={places.slice(0, 6)} />
                    </Grid>
                </Box>
            )}
            {selectedTab === 1 && (
                <Box sx={{ width: '60%', textAlign: 'center', marginBottom: 2 }}>
                    <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        인기 여행지
                    </Typography>
                    <Grid container spacing={2}>
                        <ItemContainer places={places.slice(4, 10)} />
                    </Grid>    
                </Box>
            )}
            {selectedTab === 2 && (
                <Box sx={{ width: '60%', textAlign: 'center', marginBottom: 2 }}>
                    <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        조회수
                    </Typography>
                    <Grid container spacing={2}>
                        <ItemContainer places={places.slice(1, 4).concat(places.slice(8, 12))} />
                    </Grid>
                </Box>
            )}
        </Box>
            
    );
};

export default RecommendTemplate;
