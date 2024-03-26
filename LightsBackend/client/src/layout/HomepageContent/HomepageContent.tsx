import ExpandingButton from '../ExpandingButton/ExpandingButton';
import './HomepageContent.css';

interface HomepageContentProps {
	toggleGameVisibility: () => void;
}

function HomepageContent({ toggleGameVisibility }: HomepageContentProps) {
	return (
		<div className='content'>
			<h1>Logos</h1>
			<p>
				{' '}
				<i>Limitele lumii mele sunt limitele limbii mele</i> - Ludwig
				Wittgenstein
			</p>
			<br></br>
			<br></br>
			<ExpandingButton
				text='Extinde lumea'
				toggleGameVisibility={toggleGameVisibility}
			/>
		</div>
	);
}

export default HomepageContent;
