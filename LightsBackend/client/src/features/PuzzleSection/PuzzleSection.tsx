import './PuzzleSection.css';
import Section from '../../layout/Section/Section';
import { Fragment, useEffect, useState } from 'react';
import agent from '../../api/agent';
import WordsContainer from '../../layout/WordsContainer/WordsContainer';
import HeartButton from '../../layout/Heart/Heart';
import { Sentence } from '../../types/Sentence';
import Spinner from '../../layout/Spinner/Spinner';

const PuzzleSection = () => {
	const [sentence, setSentence] = useState<Sentence>();
	const [userAnswer, setUserAnswer] = useState('');
	const [feedback, setFeedback] = useState('');
	const [puzzlesSolvedCount, setPuzzlesSolvedCount] = useState(0);
	const [wordsObtainedCount, setWordsObtainedCount] = useState(Number);

	useEffect(() => {
		agent.SentenceInteractions.countSolved()
			.then((res) => {
				setPuzzlesSolvedCount(Number(res));
			})
			.catch((err) => console.log(err.response));
	});

	useEffect(() => {
		agent.WordInteractions.countMine()
			.then((res) => {
				setWordsObtainedCount(Number(res));
				console.log(res);
			})
			.catch((err) => console.log(err.response));
	});

	const startPuzzle = async () => {
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
			setFeedback('Correct answer!');
			saveInteraction();
			setPuzzlesSolvedCount(puzzlesSolvedCount + 1);
		} else {
			setFeedback('Incorrect answer. Please try again.');
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
					<p>{puzzlesSolvedCount}</p>
				</div>
				<hr></hr>
				{wordsObtainedCount > 3 ? (
					<Fragment>
						{' '}
						<button onClick={startPuzzle}>Start Puzzle</button>
						{sentence && (
							<div>
								<p>{sentence.sentence}</p>
								<input
									type='text'
									value={userAnswer}
									onChange={(e) => setUserAnswer(e.target.value)}
									placeholder='Type your answer here'
								/>
								<button onClick={checkAnswer}>Check Answer</button>
							</div>
						)}
						{feedback && <p>{feedback}</p>}
						{feedback === 'Correct answer!' && (
							<button onClick={nextPuzzle}>Next Puzzle</button>
						)}
					</Fragment>
				) : (
					<p>Nunu trebe mai multe cuvinte</p>
				)}
			</div>
		</Section>
	);
};

export default PuzzleSection;
