import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Mountain1Svg from '../../assets/mountain-1.svg';
import Mountain2Svg from '../../assets/mountain-2.svg';
import Mountain3Svg from '../../assets/mountain-3.svg';
import CloudsBottomSvg from '../../assets/clouds-bottom.svg';
import CloudsRightSvg from '../../assets/clouds-right.svg';
import CloudsLeftSvg from '../../assets/clouds-left.svg';
import SunSvg from '../../assets/sun.svg';
import StarsSvg from '../../assets/stars.svg';

function Parallax() {
	const [background, setBackground] = useState(20);

	const parallaxRef = useRef(null);
	const mountain3 = useRef(null);
	const mountain2 = useRef(null);
	const mountain1 = useRef(null);
	const cloudsBottom = useRef(null);
	const cloudsLeft = useRef(null);
	const cloudsRight = useRef(null);
	const stars = useRef(null);
	const sun = useRef(null);
	const copy = useRef(null);
	const btn = useRef(null);

	useEffect(() => {
		let ctx = gsap.context(() => {
			gsap.registerPlugin(ScrollTrigger);
			var tl = gsap.timeline({
				defaults: { duration: 1 },
				scrollTrigger: {
					trigger: parallaxRef.current,
					start: 'top top',
					end: '5000 bottom',
					scrub: true,
					pin: true,
					onUpdate: (self) => {
						setBackground(Math.ceil(self.progress * 100 + 20));
					},
				},
			});
			tl.to(
				mountain3.current,
				{
					y: `-=${window.innerWidth > 600 ? 80 : 50}`,
				},
				0
			);
			tl.to(
				mountain2.current,
				{
					y: `-=${window.innerWidth > 600 ? 50 : 20}`,
				},
				0
			);
			tl.to(
				mountain1.current,
				{
					y: '+=50',
				},
				0
			);
			tl.to(
				stars.current,
				{
					top: 10,
				},
				0.5
			);
			tl.to(
				cloudsBottom.current,
				{
					opacity: 0,
					duration: 0.5,
				},
				0
			);
			tl.to(
				cloudsLeft.current,
				{
					x: '-20%',
					opacity: 0,
				},
				0
			);
			tl.to(
				cloudsRight.current,
				{
					x: '20%',
					opacity: 0,
				},
				0
			);
			tl.to(
				sun.current,
				{
					y: `+${window.innerHeight * 0.55}`,
				},
				0
			);
			tl.to(
				copy.current,
				{
					y: `-${
						window.innerHeight > 700
							? window.innerHeight * 0.4
							: window.innerHeight * 0.55
					}`,
					opacity: 1,
					ease: 'power4.easeIn',
				},
				0.5
			);
			tl.to(
				btn.current,
				{
					opacity: 1,
				},
				1.5
			);
		});
		return () => ctx.revert();
	}, []);

	return (
		<div className='parallax-outer'>
			<div
				ref={parallaxRef}
				style={{
					background: `linear-gradient(#0F2B9C, #673D7D ${background}%, #A74A67, #EDFC54 )`,
				}}
				className='parallax'
			>
				<img ref={mountain3} className='mountain-3' src={Mountain3Svg} />
				<img ref={mountain2} className='mountain-2' src={Mountain2Svg} />
				<img ref={mountain1} className='mountain-1' src={Mountain1Svg} />
				<img ref={sun} className='sun' src={SunSvg} />
				<img
					ref={cloudsBottom}
					className='clouds-bottom'
					src={CloudsBottomSvg}
				/>
				<img ref={cloudsLeft} className='clouds-left' src={CloudsLeftSvg} />
				<img ref={cloudsRight} className='clouds-right' src={CloudsRightSvg} />
				<img ref={stars} className='stars' src={StarsSvg} />
				<div ref={copy} className='copy'>
					<h1>Logos</h1>
					<a id='orizonturi-noi' href='/game'>
						<span ref={btn}>Orizonturi noi</span>
					</a>
				</div>
			</div>
		</div>
	);
}

export default Parallax;
