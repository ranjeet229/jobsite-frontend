import React from 'react'
import { Popover } from '@radix-ui/react-popover'
import { PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-white shadow-sm'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>

                <h1 className='text-2xl font-bold'>
                    Job<span className='text-blue-500'>Portal</span>
                </h1>


                <div className='flex items-center gap-6'>
                    {/* Navigation Links */}
                    <ul className='flex items-center gap-5 text-sm font-medium text-gray-700'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li className='cursor-pointer hover:text-blue-500 transition'><Link to="/admin/companies">Companies</Link></li>
                                    <li className='cursor-pointer hover:text-blue-500 transition'><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className='cursor-pointer hover:text-blue-500 transition'><Link to="/">Home</Link></li>
                                    <li className='cursor-pointer hover:text-blue-500 transition'><Link to="/jobs">Jobs</Link></li>
                                    <li className='cursor-pointer hover:text-blue-500 transition'><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login">
                                    <Button
                                        variant="outline"
                                        className="cursor-pointer border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button
                                        variant="outline"
                                        className="cursor-pointer border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
                                    >
                                        Signup
                                    </Button>
                                </Link>


                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>

                                <PopoverContent className="w-72 space-y-4" align="end">
                                    {/* Profile Info */}
                                    <div className='flex gap-4 items-center'>
                                        <Avatar>
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium text-base'>{user?.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>

                                    {/* Options */}
                                    <div className='flex flex-col gap-2 text-sm text-gray-700'>
                                        {user?.role === 'student' && (
                                            <Button
                                                variant="ghost"
                                                className="flex items-center gap-2 justify-start text-gray-600 hover:text-black"
                                            >
                                                <User2 size={18} />
                                                <Link to="/profile">View Profile</Link>
                                            </Button>
                                        )}
                                        <Button
                                            onClick={logoutHandler}
                                            variant="ghost"
                                            className="flex items-center gap-2 justify-start text-gray-600 hover:text-black"
                                        >
                                            <LogOut size={18} />
                                            Logout
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Navbar
