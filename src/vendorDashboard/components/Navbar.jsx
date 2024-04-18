

const Navbar = ({showLoginHandler,showRegisterHandler,showLogout,logoutHandler}) => {
  const firmname = localStorage.getItem('firmname')

  return (
   <div className='navSection'>
  
    <div className='company'>
Vendor Dashboard
    </div>
    <div className="firmName">
      <h4>FirmName : {firmname}</h4>
    </div>
    <div className="userAuth">
      {!showLogout ?
      <>      <span onClick={showLoginHandler}>Login/</span>
      <span onClick={showRegisterHandler}>Register</span>
      </>:
      <span onClick={logoutHandler}>Logout</span>
    }

    </div>
    </div>
  )
}
// Navbar.propTypes = {
//   showLoginHandler: PropTypes.string.isRequired,
//   showRegisterHandler: PropTypes.string.isRequired
// }


export default Navbar
