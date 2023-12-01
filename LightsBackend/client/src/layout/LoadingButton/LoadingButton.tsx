import './LoadingButton.css'

interface LoadingButtonProps {
    text: string
    isLoading: boolean
    isDisabled?: boolean
}

function LoadingButton({text, isLoading, isDisabled} : LoadingButtonProps) {
    return (
        <>
            <button disabled={isDisabled}>
                {isLoading ? 'hm...' : text}
            </button>
        </>
    )
}

export default LoadingButton