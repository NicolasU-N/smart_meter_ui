// Link,
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLogout } from '@store/auth/actions'

const Navbar = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => state.auth)

  const authLinks = (
    <>
      <li className='nav-item'>
        <NavLink className='nav-link' to='/dashboard'>
          Dashboard
        </NavLink>
      </li>
      <li className='nav-item'>
        <a className='nav-link' href='#!' onClick={() => dispatch(fetchLogout())}>
          Logout
        </a>
      </li>
    </>
  )

  const guestLinks = (
    <>
      <li className='nav-item'>
        <NavLink className='nav-link' to='/login'>
          Login
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink className='nav-link' to='/register'>
          Register
        </NavLink>
      </li>
    </>
  )

  return (
    <nav class='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div class='container-fluid'>
        <NavLink className='nav-link' to='/'>
          <span className='navbar-brand'>Smart Meter App</span>
        </NavLink>
        <button class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span class='navbar-toggler-icon' />
        </button>
        <div class='collapse navbar-collapse ' id='navbarSupportedContent'>
          <ul class='navbar-nav ms-auto me-0'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/'>
                Home
              </NavLink>
            </li>
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
