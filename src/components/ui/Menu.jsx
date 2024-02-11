import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/Auth'
import { getFirstLetter, isAdminRoute } from '../../helpers/helpers'
import { ReactSVG } from 'react-svg'
import { Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material'
import ArrowDownIcon from '../../assets/images/arrow_down_icon.svg'

export const Menu = () => {
  const { admin, dispatch } = useAuth()
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const navigate = useNavigate()

  const currentUser = admin.logged && isAdminRoute ? admin : {}
  const username = isAdminRoute ? currentUser?.name : ''

  const handleToggle = () => setOpen(prevOpen => !prevOpen)
  const handleLogout = async event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return

    if (admin.logged) {
      handleToggle()
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }, 
      }
      const response = await fetch('http://localhost:3000/admin/sessions',options)
      if (response.ok) {
        dispatch({ type: 'Logout' })
      }
      navigate('/admin')
    }
  }
  const handleSelectedItem = () => {
    handleToggle()
  }
  if (!isAdminRoute) return null
  if (isAdminRoute && !admin.logged) return null

  return (
    <>
      <button
        className="flex text-sm items-center ml-auto"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <div className="bg-orange-500 p-2 text-white font-bold rounded">
          <div>{getFirstLetter(currentUser?.name || '')}</div>
        </div>
        <div className="pl-4 text-black hidden md:block">
          {`${username}`}
        </div>
        <ReactSVG src={ArrowDownIcon} className="ml-2 md:ml-4 text-white" />
      </button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        placement="bottom-end"
        className="z-10"
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <MenuList autoFocusItem={open} id="menu-list-grow">
                {!isAdminRoute && <MenuItem onClick={() => handleSelectedItem('/perfil')}>Mi perfil</MenuItem>}
                <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
              </MenuList>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}