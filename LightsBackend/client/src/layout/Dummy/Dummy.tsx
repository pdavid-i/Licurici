import agent from '../../api/agent'
import {motion} from 'framer-motion'

function Dummy() {

    return (
        <>
            <h1>Eruori</h1>
            <button onClick={() => agent.TestErrors.get400Error()}>Bad Request - 400</button>
            <button onClick={() => agent.TestErrors.get401Error()}>Unauthenticated - 401</button>
            <button onClick={() => agent.TestErrors.get404Error()}>Not Found - 404</button>
            <button onClick={() => agent.TestErrors.get500Error()}>Internal Server Error - 500</button>
            <button onClick={() => agent.TestErrors.getValidationError()}>Validation Error</button>
        </>
    )
}

export default Dummy