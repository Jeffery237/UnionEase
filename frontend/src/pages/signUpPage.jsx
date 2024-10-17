import FloatingShape from "../components/FloatingShape";
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {Lock, Mail, User, Loader} from 'lucide-react'
import Input from '../components/Input'
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

	const { signup, error, isLoading } = useAuthStore();

    const handleSignup = async (e)=>{
        e.preventDefault();
        try {
			await signup(name, email, password);
			navigate("/verify-email");
		} catch (error) {
			console.log(error);
		}
    }
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900'>
    <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl'
    >
        <div className='p-8'>

            <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

            
            <h2 
            className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500
            text-transparent bg-clip-text'>
                Create Account
            </h2>
            <form onSubmit={handleSignup}>
                <Input
                    icon={User}
                    type='text'
                    placeholder='Full Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    icon={Mail}
                    type='email'
                    placeholder='Email Address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    icon={Lock}
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {/* Password strength meter */}
                {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
                <PasswordStrengthMeter password={password} />
                <motion.button
                className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
                font-bold rounded-lg shadow-lg hover:from-green-600
                hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                 focus:ring-offset-gray-900 transition duration-200'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type='submit'
                disabled={isLoading}>
                {isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Sign Up"}
                
                </motion.button>
            </form>
        </div>
        <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<p className='text-sm text-gray-400'>
					Already have an account?{" "}
					<Link to={"/login"} className='text-green-400 hover:underline'>
						Login
					</Link>
				</p>
			</div>
    
    </motion.div>
    </div>
  )
}

export default SignUpPage