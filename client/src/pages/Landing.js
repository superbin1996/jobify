import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/Testing'
import { Logo } from '../components/Index'
import { Link } from 'react-router-dom'

function Landing() {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className='container page'>
				{/* INFO */}
				<div className="info">
					<h1>job <span>tracking</span> app</h1>
					<p>I'm baby pinterest chambray literally man braid iceland schlitz tacos. Palo santo polaroid raclette woke, vaporware taiyaki irony ugh yuccie scenester hell of gastropub. Narwhal air plant hammock small batch biodiesel. Dreamcatcher whatever pop-up
					</p>
					<Link to='/register' className='btn btn-hero'>Login/Register</Link>
				</div>
				<img src={main} alt="job hunt" className='img main-img' />
			</div>
		</Wrapper>
	)
}


export default Landing