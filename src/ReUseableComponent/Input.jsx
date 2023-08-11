import React from 'react'

export default function Input(props) {
  return <input className={props.className} value={props.value} type={props.type} id={props.id} style={props.style} onChange={props.onChange} placeholder={props.placeholder} name={props.name}/>
}
