import React from 'react'
import { Link } from 'react-router-dom'
import "./Header.css"
function Header() {
    return (

        <header className='header'>
            <nav className='navbar'>
                <Link to='/' >בית </Link>
                <Link to='/admin' >דף ניהול </Link>
                <Link to='/login' >התחברות </Link> 
            </nav>

        </header>
    )
}

export default Header
