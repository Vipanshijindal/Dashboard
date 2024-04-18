import PropTypes from 'prop-types';

const Sidebar = ({showFirmHandler,showProductHandler,showAllProductsHandler,showFirmTitle}) => {
  return (
    <div className='sidebarSection'>
      <ul>
        {showFirmTitle ? <li onClick={showFirmHandler}>Add Firm</li>:"" }
       
        <li onClick={showProductHandler}>Add Product</li>
        <li onClick={showAllProductsHandler}>All Products</li>
        <li>User Details</li>
      </ul>
      </div>)
}
// Sidebar.propTypes = {
//   showFirmHandler: PropTypes.string.isRequired,
//   showProductHandler: PropTypes.string.isRequired
// }

export default Sidebar;
