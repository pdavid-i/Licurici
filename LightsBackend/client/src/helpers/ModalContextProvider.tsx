import {
	ReactNode,
	createContext,
	useState,
	Dispatch,
	SetStateAction,
} from 'react';

interface ModalContextProviderProps {
	children: ReactNode;
}

interface ModalContextType {
	wordId: number | undefined;
	showWordModal: boolean;
	setWordId: Dispatch<SetStateAction<number | undefined>>;
	setShowWordModal: Dispatch<SetStateAction<boolean>>;
	toggleWordModal: () => void;
}

const defaultContextValue: ModalContextType = {
	wordId: undefined,
	showWordModal: false,
	setWordId: () => {},
	setShowWordModal: () => {},
	toggleWordModal: () => {},
};

export const ModalContext =
	createContext<ModalContextType>(defaultContextValue);

export const ModalContextProvider: React.FC<ModalContextProviderProps> = ({
	children,
}) => {
	const [showWordModal, setShowWordModal] = useState<boolean>(false);
	const [wordId, setWordId] = useState<number | undefined>(undefined);

	const toggleWordModal = () => {
		setShowWordModal(!showWordModal);
	};

	return (
		<ModalContext.Provider
			value={{
				showWordModal,
				setShowWordModal,
				wordId,
				setWordId,
				toggleWordModal,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};
