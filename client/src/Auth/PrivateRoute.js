
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
const navigate = useNavigate()
    const {token} = useSelector((state) => state.auth);

    if(token !== null)
        return children
    else{
        useEffect(()=>{
            navigate('/login')
            toast.error('Please login')
        },[])
    }
        

}

export default PrivateRoute