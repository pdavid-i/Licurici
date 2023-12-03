import { ReactNode } from 'react'
import './Section.css'

interface SectionProps {
    children: ReactNode
}

function Section({children} : SectionProps) {
    return <>
    <div className='section'>
        {children}
    </div>
    </>
}

export default Section
