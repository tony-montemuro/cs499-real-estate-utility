import AbrvShowingInstance from "./AbrvShowingInstance.jsx";
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';

function ListOfShowingsCmp() {

    return (
        <Box sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }} >

            <FixedSizeList
                height={400}
                width={360}
                itemSize={46}
                itemCount={50}
                overscanCount={5}
                itemData={{ offset: 50 }}
            >
                {AbrvShowingInstance}
            </FixedSizeList>

        </Box>
    )
};

export default <ListOfShowingsCmp/>