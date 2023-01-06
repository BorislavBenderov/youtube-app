import { Typography, Box, Stack } from "@mui/material";
import { Sidebar, Videos } from "./";
import { FetchFromAPI } from "../utils/fetchFromAPI";
import { useEffect, useState } from "react";

export const Feed = () => {
    const [selectedCategory, setSelectedCategory] = useState('New');
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        FetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
            .then((data) => {
                setVideos(data.items);
            })
            .catch((err) => {
                alert(err.message);
            })
    }, [selectedCategory]);

    return (
        <Stack sx={{ flexDirection: { sx: 'column', md: 'row' } }}>
            <Box sx={{ height: { sx: 'auto', md: '92vh' }, borderRight: '1px solid #3d3d3d', px: { sx: 0, md: 2 } }}>
                <Sidebar
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
                <Typography
                    className="copyright"
                    variant="body2"
                    sx={{ mt: 1.5, color: "#fff" }}>
                    Copyright 2023
                </Typography>
            </Box>
            <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
                <Typography variant="h4" fontWeight='bold' mb={2} sx={{ color: 'white' }}>
                    {selectedCategory}
                    <span style={{ color: '#F31503' }}>videos</span>
                </Typography>
                <Videos videos={videos} />
            </Box>
        </Stack>
    );
}