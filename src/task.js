import './task.css'
import DeleteIcon from '@mui/icons-material/Delete';
import {List, ListItem, ListItemAvatar, ListItemText} from '@mui/material'
const task = ({taskText, onClick}) => {
    return (
        <List className="todolist">
            <ListItem>
                <ListItemText primary={taskText} />
            </ListItem>
            <DeleteIcon fontSize="large" style={{opacity:0.7}} onClick={onClick}/>
        </List>

    )
};
export default task;