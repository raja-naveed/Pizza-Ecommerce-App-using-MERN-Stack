import React , {useContext}from 'react'
import { Link } from 'react-router-dom'
import { CardContext } from "../CardContext";

const Navigation = () => {
  const {cart}= useContext(CardContext);

    const CartStyle = {
        backgroundColor: '#F59E0D',
        display: 'flex',
        padding: '6px 12px',
        borderRadius: '50px',    }
  return (
    <nav className='container mx-auto flex items-center justify-between py-6'>
      <Link to='/'>
        <img style={{height:45}} src="/images/logo.png" alt="" />
      </Link>
        <ul className='flex items-center font-semibold'>
            <li><Link to='/'>Home</Link></li>
            <li className='ml-6'><Link to='/products'>Products</Link></li>
            <li className='ml-6'><Link to='/createpizza'>Add Pizza</Link></li>
            <li className='ml-6'><Link to='/cart'>
                <div style={CartStyle}>
                <span>{cart.totalItems? cart.totalItems: "0" }</span>
                <img className='ml-2' src="/images/cart.png" alt="" />
                </div>
                </Link></li>
        </ul>
    </nav>
  )
}

export default Navigation;
