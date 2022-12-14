import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Wrapper from "../assets/wrappers/RegisterPage"
import { Logo, FormRow, Alert } from "../components/index"
import { useAppContext } from "../context/appContext"

const initialState = {
	name: '',
	email: '',
	password: '',
	isMember: true,
}

const Register = () => {
	const [values, setValues] = useState(initialState)

	// global state and useNavigate
	const { isLoading, showAlert, displayAlert, registerUser, loginUser } = useAppContext()
	const { user } = useAppContext()
	const navigate = useNavigate()

	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigate('/')
			}, 1000)
		}
	}, [user, navigate])

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}

	const toggleMember = () => {
		setValues({ ...values, isMember: !values.isMember })
	}

	const onSubmit = (e) => {
		e.preventDefault()
		const { name, email, password, isMember } = values
		if (!email || !password || (!isMember && !name)) {
			displayAlert()
			return
		}
		const currentUser = { name, email, password }
		if (isMember) {
			loginUser(currentUser)
		}
		else {
			registerUser(currentUser)
		}
	}

	return (
		<Wrapper className="full-page">
			<form className="form" onSubmit={onSubmit}>
				<Logo />
				<h3>{values.isMember ? 'Login' : 'Register'}</h3>
				{showAlert && <Alert />}

				{/* name input */}
				{values.isMember ||
					<FormRow type='text' name='name' value={values.name} handleChange={handleChange} />
				}

				{/* email input */}
				<FormRow type='email' name='email' value={values.email} handleChange={handleChange} />

				{/* password input */}
				<FormRow type='password' name='password' value={values.password} handleChange={handleChange} />

				<button type='submit' className="btn btn-block" disabled={isLoading}>submit</button>
				<p>{values.isMember ? 'Not a member yet?' : 'Already a member?'}
					<button type='button' onClick={toggleMember} className='member-btn'>{values.isMember ? 'Register' : 'Login'}</button>
				</p>
			</form>
		</Wrapper>
	)
}
export default Register