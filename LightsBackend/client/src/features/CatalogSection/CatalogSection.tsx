import './CatalogSection.css';
import Section from '../../layout/Section/Section';
import { useEffect, useState } from 'react';
import agent from '../../api/agent';
import WordsContainer from '../../layout/WordsContainer/WordsContainer';
import HeartButton from '../../layout/Heart/Heart';
import Spinner from '../../layout/Spinner/Spinner';

export interface Word {
	name: string;
	id: number;
}

function CatalogSection() {
	const [words, setWords] = useState<Word[]>([]);
	const [filterFavorite, setFilterFavorite] = useState(false);
	const [wordCount, setWordCount] = useState(Number);
	const [isLoading, setIsLoading] = useState(true);

	function toggleFavorites() {
		setFilterFavorite(!filterFavorite);
	}

	useEffect(() => {
		agent.Words.count()
			.then((res) => {
				setWordCount(Number(res));
			})
			.catch((err) => console.log(err.response));
	});

	useEffect(() => {
		if (!filterFavorite) {
			agent.WordInteractions.mine()
				.then((res) => {
					setWords(res);
					setIsLoading(false);
				})
				.catch((err) => console.log(err.response));
		} else {
			agent.WordInteractions.getFavorites()
				.then((res) => {
					setWords(res);
				})
				.catch((err) => console.log(err.response));
		}
	}, [filterFavorite]);

	return (
		<Section>
			<div className='innerSection'>
				<div id='catalogHeader'>
					<h1 id='catalogHeadline'>Catalog</h1>
					<button id='favoritesFilter' onClick={toggleFavorites}>
						<HeartButton isFull={filterFavorite} />
					</button>
				</div>
				<hr></hr>
				{isLoading ? (
					<div className='center-spinner'>
						<Spinner size={50} />
					</div>
				) : (
					<WordsContainer
						words={words}
						showMissing={!filterFavorite}
						totalCount={wordCount}
					/>
				)}
			</div>
		</Section>
	);
}

export default CatalogSection;
