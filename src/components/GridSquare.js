import React from 'react'

export default function GridSquare(props) {
  return (
    <div id={props.coord} className={"square " + 
                                    (props.placed ? "placed " : "") + 
                                    (props.hovered ? "hovered ": "")
    }>
      
    </div>
  )
}

