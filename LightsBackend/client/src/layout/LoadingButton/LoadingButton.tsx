import Spinner from '../Spinner/Spinner';
import './LoadingButton.css';

interface LoadingButtonProps {
	text: string;
	isLoading: boolean;
	isDisabled?: boolean;
}

function LoadingButton({ text, isLoading, isDisabled }: LoadingButtonProps) {
	return (
		<>
			<button disabled={isDisabled}>
				{isLoading ? <Spinner size={30} /> : text}
			</button>
		</>
	);
}

export default LoadingButton;
