import './LandingPage.css';
import Paralax from './Parallax';

function LandingPage() {
	return (
		<>
			<Paralax />
			<div className='about'>
				<i id='citat-landing'>
					"Căci orice cuvânt e o uitare și în aproape oricare s-au îngropat
					înțelesuri de care nu mai știi."
				</i>
				<div id='autor'>- Constantin Noica</div>
				<p className='paragraph'>
					Adeseori uităm că lumea n-o vedem doar cu ochii. Cuvintele se află
					într-un substrat atât de fundamental în percepția noastră a
					existenței, încât pierdem din vedere că sunt acolo.
				</p>
				<p className='paragraph'>
					Simțim lumea prin simțuri, și o rostuim cuprinzând-o în cuvinte.
					Cuvântul potrivit ne pictează lumea în culori noi - văzând mai clar
					prin ochiul minții și cei din orbite privesc mai clar și disting
					nuanțe până atunci nesesizate.
				</p>
				<p className='paragraph'>
					Când auzim prima oară de gustul unui vin fiind descris ca floral de
					pildă, ni se limpezesc arome înainte bâjbâite. Limba din gură îmi e
					acceași - dar pot simți gustul diferit în funcție de limba ce o am în
					minte.
				</p>
			</div>
		</>
	);
}

export default LandingPage;
