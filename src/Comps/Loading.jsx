import React,{useContext} from 'react'
import "../css/pages.css"
import StyleContext from '../Context/StyleProvider'

const Loading = () => {
  const {load} = useContext(StyleContext)

  return (
    <section
      className='load' 
      style={load? {display:"block"}:{display:"none"}}
    >
      <div>
        <h1>Loading . . .</h1>
      </div>
    </section>
  )
}

export default Loading