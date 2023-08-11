import React from 'react'

export default function Label(props) {
  return <label htmlFor={props.htmlFor} className={props.className} style={props.style} id={props.id}>{props.children}</label>
}
