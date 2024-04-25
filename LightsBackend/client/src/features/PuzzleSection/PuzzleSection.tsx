import './PuzzleSection.css';
import Section from '../../layout/Section/Section';
import { Fragment, useEffect, useState } from 'react';
import agent from '../../api/agent';
import WordsContainer from '../../layout/WordsContainer/WordsContainer';
import HeartButton from '../../layout/Heart/Heart';
import { Sentence } from '../../types/Sentence';
import Spinner from '../../layout/Spinner/Spinner';
import Gatekeeper from '../../layout/Gatekeeper/Gatekeeper';
import Lifeline from '../../layout/Lifeline/Lifeline';
import CongratsMessage from './CongratsPuzzle';

const PuzzleSection = () => {
	const [sentence, setSentence] = useState<Sentence>();
	const [userAnswer, setUserAnswer] = useState('');
	const [feedback, setFeedback] = useState('');
	const [puzzlesSolvedCount, setPuzzlesSolvedCount] = useState(0);
	const [wordsObtainedCount, setWordsObtainedCount] = useState(Number);
	const [buttonClicked, setButtonClicked] = useState(false);
	const goodFeedback = ['Perfect!', 'A-ntâia!', 'Smirna!', 'Tot asa!'];
	const badFeedback = [
		'N-a fost să fie.',
		'Mai încearcă.',
		'Poți mai bine.',
		'E și mâine o zi.',
		'Mai încearcă.',
		'Aproape dar nu chiar.',
	];

	useEffect(() => {
		agent.SentenceInteractions.countSolved()
			.then((res) => {
				setPuzzlesSolvedCount(Number(res));
			})
			.catch((err) => console.log(err.response));
	}, [sentence]);

	const randomFeedback = (feedbackArray: string[]) => {
		return feedbackArray[Math.floor(Math.random() * feedbackArray.length)];
	};

	useEffect(() => {
		agent.WordInteractions.countMine()
			.then((res) => {
				setWordsObtainedCount(Number(res));
				console.log(res);
			})
			.catch((err) => console.log(err.response));
	}, []);

	const startPuzzle = async () => {
		setButtonClicked(true);
		console.log('startPuzzle');
		try {
			const response = await agent.SentenceInteractions.new();
			console.log(response);
			setSentence(response); // Assuming the API response contains the sentence and answer
			setFeedback('');
			setUserAnswer('');
		} catch (error) {
			console.error('Error fetching sentence:', error);
			setFeedback('Error fetching sentence. Please try again.');
		}
	};

	const saveInteraction = async () => {
		const data = {
			sentenceId: sentence?.id,
			hintUsed: true,
		};

		try {
			const response = await agent.SentenceInteractions.complete(data);
			console.log(response);
		} catch (error) {
			console.error('Error saving sentence:', error);
		}
	};

	const checkAnswer = () => {
		if (!sentence || !userAnswer.trim()) return; // Ensure both sentence and user answer are provided

		if (userAnswer.trim().toLowerCase() === sentence.answer.toLowerCase()) {
			setFeedback(randomFeedback(goodFeedback));
			saveInteraction();
		} else {
			setFeedback(randomFeedback(badFeedback));
		}
	};

	const nextPuzzle = () => {
		startPuzzle(); // Load another random sentence
	};

	return (
		<Section>
			<div className='innerSection'>
				<div id='catalogHeader'>
					<h1 id='catalogHeadline'>Piese</h1>
				</div>
				<hr></hr>
				{wordsObtainedCount > 3 ? (
					<Fragment>
						{' '}
						{wordsObtainedCount == 4 && <CongratsMessage />}
						<div id='puzzleContainer'>
							{!buttonClicked && (
								<div id='startPuzzleButtonContainer'>
									<button onClick={startPuzzle}>Ia să vedem</button>
								</div>
							)}
							{sentence && (
								<div>
									<div id='sentenceContainer'>
										<p>{sentence.sentence}</p>
									</div>
									<div id='answerBar'>
										<input
											type='text'
											value={userAnswer}
											onChange={(e) => setUserAnswer(e.target.value)}
											placeholder='Pune o piesă..'
										/>
										{!goodFeedback.includes(feedback) && (
											<button onClick={checkAnswer}>Verific-o</button>
										)}
										{window.innerWidth > 620 && (
											<Lifeline tooltipText={sentence.hint} />
										)}
									</div>
								</div>
							)}
							<div id='postCheck'>
								{feedback && <p>{feedback}</p>}

								{goodFeedback.includes(feedback) && (
									<button onClick={nextPuzzle}>Mai vreau</button>
								)}
							</div>
						</div>
					</Fragment>
				) : (
					<Gatekeeper />
				)}
			</div>
		</Section>
	);
};

export default PuzzleSection;
