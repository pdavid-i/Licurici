import Torchman from '../../assets/torchman.svg';
import Unknown from '../../assets/unknown.svg';
import './Gatekeeper.css';

function Gatekeeper() {
	return (
		<div id='gatekeeper'>
			<div id='warning-icons'>
				<img src={Unknown} alt='Warning icon' />
				<img src={Torchman} alt='Warning icon' />
			</div>
			<h1> Ău, grijă! </h1>
			<p>Pentru siguranța tuturor, nu poți intra aici nepregătit.</p>
			<p>Găsește mai multe cuvinte și încearcă din nou.</p>
		</div>
	);
}

export default Gatekeeper;
