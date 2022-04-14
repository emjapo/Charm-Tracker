import React from "react"
import Paper from "@mui/material/Paper"
import Divider from "@mui/material/Divider"
import MenuList from "@mui/material/MenuList"
import MenuItem from "@mui/material/MenuItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import Typography from "@mui/material/Typography"
import ContentCut from "@mui/icons-material/ContentCut"
import ContentCopy from "@mui/icons-material/ContentCopy"
import ContentPaste from "@mui/icons-material/ContentPaste"
import Cloud from "@mui/icons-material/Cloud"
import { faBarsProgress } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Task = props => {
  const { task, completed } = props
  return (
    <MenuList>
      <MenuItem>
        <ListItemIcon>
          <FontAwesomeIcon icon={faBarsProgress} />
        </ListItemIcon>
        <ListItemText>Event {completed ? "Done" : "Incomplete"}</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon style={{ overflow: "wrap" }}>{task}</ListItemIcon>
      </MenuItem>
      <Divider />
    </MenuList>
  )
}

export default Task
