// import { MenuRounded } from '@mui/icons-material';
import { Box, Button, Drawer, Icon, IconButton, List, ListItemButton, ListItemIcon, ListItemText, ToggleButton } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
// import { FaThList } from 'react-icons/fa'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ContactPopUp from '../contactpopup/ContactPopUp';
import CustomModel from "../model/index";
import "./style.css"

const Drawercomp = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = (set) => set(true);
  const navigate = useNavigate()
  return (
    <>
      <Drawer
       open={open} onClose={() => setOpen(false)}>
        <List>
              <Link className='nav_link_home_mobile' to="/" >Home</Link>
              <Link className='nav_link_home_mobile' to="/pricingtable" >Pricing</Link>
             <Link className='nav_link_home_mobile' to="/jobs/search" >Jobs</Link>
             <Link className='nav_link_home_mobile' to="/news" >News</Link>
             <Link className='nav_link_home_mobile' to="/contact-us" >Contact Us</Link>
              

          <Box className="nav_link_home_mobile_btns" >
          <ListItemText><Button className='sign_in_btn' size='small' variant='outline' onClick={()=>navigate("/login")}>Sign in</Button></ListItemText>
              <ListItemText><Button className='sign_up_btns' size='small' variant='outline' onClick={()=>navigate("/sign-up")}>Sign up</Button></ListItemText>
              <ListItemText><Button className='req_dem_btn' size='small' variant='contained' onClick={() => handleOpen(setOpen1)}>Request Demo</Button></ListItemText>
              <CustomModel open={open1} setOpen={setOpen1}>
              <ContactPopUp setOpen2={setOpen2} setOpen={setOpen1} />
            </CustomModel>
            <CustomModel open={open2} setOpen={setOpen2}>
              <ContactPopUp setOpen={setOpen2} />
            </CustomModel>
          </Box>
        </List>
      </Drawer>
      <IconButton  sx={{ marginLeft: 'auto'}} style={{color:'#00CFC5'}} onClick={() => setOpen(!open)}>
        <AiOutlineMenu />
      </IconButton>
    </>
  )
}

export default Drawercomp