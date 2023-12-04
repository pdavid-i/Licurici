import { ReactNode, createContext, useState } from 'react';

interface ModelContextProviderPros {
  children: ReactNode
}

interface ModelContextProviderType  {
  wordId: number | undefined
  showWordModal: boolean
  setWordId: () => React.Dispatch<React.SetStateAction<number | undefined>>
  setShowWordModal: () => React.Dispatch<React.SetStateAction<boolean>>;
  toggleWordModal: () => void;
}

const defaultContextValue: ModelContextProviderType = {
  setWordId: (() => {}),
  setShowWordModal: () => {}
};

export const ModalContext = createContext(defaultContextValue);



export const ModalContextProvider = ({ children } : ModelContextProviderPros) => {
    const [showWordModal, setShowWordModal] = useState(false);
    const [wordId, setWordId] = useState(undefined);

    const toggleWordModal = () => {
      setShowWordModal(!showWordModal);
    };
    
    return (
        <ModalContext.Provider value={{ setShowWordModal, wordId, showWordModal, setWordId, toggleWordModal}}>
            {children}
        </ModalContext.Provider>
    );
}