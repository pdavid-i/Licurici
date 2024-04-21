import { motion } from 'framer-motion';
import Focus from '../Focus/Focus';
import './Modal.css';
import { useContext, useEffect, useState } from 'react';
import { Word } from '../../types/Word';
import agent from '../../api/agent';
import LoadingButton from '../LoadingButton/LoadingButton';
import Heart from '../../features/HeartWord/HeartWord';
import Diamond from '../Diamond/Diamond';
import { UserContext } from '../../helpers/UserContextProvider';
import Spinner from '../Spinner/Spinner';

interface ModalProps {
	toggleWordModal: () => void;
	wordId: number | undefined;
}

const Modal = ({ toggleWordModal, wordId }: ModalProps) => {
	const [foundAt, setFoundAt] = useState('');
	const [word, setWord] = useState<Word>();
	const [userInput, setUserInput] = useState('');
	const [inputFeedback, setInputFeedback] = useState('');
	const [inputRating, setInputRating] = useState(0);
	const [isInteractionLoading, setIsInteractionLoading] = useState(false);
	const [isWordLoading, setIsWordLoading] = useState(true);
	const { isAuth } = useContext(UserContext);

	const riseUp = {
		hidden: {
			opacity: 0,
			y: '100vh',
		},
		visible: {
			opacity: 1,
			y: '0',
			transition: {
				duration: 0.8,
				ease: 'easeOut',
			},
		},
		exit: {
			opacity: 0,
			y: '-30vh',
			transition: {
				ease: 'easeIn',
			},
		},
	};

	useEffect(() => {
		if (wordId) {
			agent.WordInteractions.myInteraction(wordId)
				.then((res) => {
					console.log(res);
					setFoundAt(res.createdAt);
					setWord(res.word);
					setInputRating(inputRating);
					setInputFeedback(inputFeedback);
					setIsWordLoading(false);
				})
				.catch((err) => console.log(err.response));
		} else {
			agent.Words.random()
				.then((res) => {
					console.log(res);
					setWord(res);
					setIsWordLoading(false);
				})
				.catch((err) => console.log(err.response));
		}
	}, []);

	useEffect(() => {
		if (inputRating > 1) {
			console.log('Recorded');
			recordInteraction();
		}
	}, [inputRating]);

	const checkFeedback = () => {
		if (!word || !userInput || isInteractionLoading) return;

		const examplePayload = {
			word: word.name,
			context: userInput,
		};

		setIsInteractionLoading(true);
		agent.WordInteractions.checkUsage(examplePayload)
			.then((res) => {
				setInputFeedback(res.comments);
				setInputRating(res.rating);
				setIsInteractionLoading(false);
			})
			.catch((err) => console.log(err.response));
	};

	const recordInteraction = () => {
		const interactionData = {
			wordId: word?.id,
			usage: userInput,
			usageRating: inputRating,
		};

		// Record the interaction
		agent.WordInteractions.new(interactionData).catch((err) => {
			console.log('Pl eroare:', err);
			console.log('Error recording interaction:', err.response);
		});
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-GB');
	};

	if (isWordLoading)
		return (
			<Focus toggleWordModal={toggleWordModal}>
				<Spinner size={100} />
			</Focus>
		);
	return (
		<Focus toggleWordModal={toggleWordModal}>
			<motion.div
				onClick={(e) => e.stopPropagation()}
				className='modal'
				variants={riseUp}
				initial='hidden'
				animate='visible'
				exit='exit'
			>
				<div></div>
				<div>
					{isAuth && word && <Heart id={word.id} />}
					{inputRating > 2 && <Diamond />}
				</div>
				<h3 id='word-name' className={inputRating > 2 ? 'diamond' : ''}>
					{word?.name}
				</h3>
				<hr></hr>
				<ul>
					{word?.definitions.map((definition, index) => {
						return (
							<li key={index}>
								<WordMeaning definition={definition} />
							</li>
						);
					})}
					<p className='example'>
						<i>{word?.examples[0]}</i>
					</p>
				</ul>

				{!foundAt ? (
					<>
						<input
							id='input-area'
							type='text'
							value={userInput}
							onChange={(e) => setUserInput(e.target.value)}
							placeholder={`Pune în valoare sensul cuvântului ${word?.name}`}
						/>
						<div id='check-wrapper' onClick={checkFeedback}>
							<LoadingButton
								text='Check'
								isLoading={isInteractionLoading}
								isDisabled={!userInput || isInteractionLoading}
							/>
						</div>
						{inputFeedback && (
							<div id='feedback' className={'rating' + inputRating.toString()}>
								<p>{inputFeedback}</p>
							</div>
						)}
					</>
				) : (
					<div id='found-at'>
						<i>Acest cuvant a fost gasit in {formatDate(foundAt)}</i>
					</div>
				)}
			</motion.div>
		</Focus>
	);
};

const WordMeaning = ({ definition }: { definition: string }) => {
	return (
		<>
			<p className='definition'>{definition}</p>
		</>
	);
};

export default Modal;
