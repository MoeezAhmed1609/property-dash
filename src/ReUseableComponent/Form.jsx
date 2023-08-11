import React from 'react'

export default function Form({ children, action, className, method, style, onSubmit }) {
    return <form action={action} className={className} style={style} onSubmit={onSubmit} method={method}>{children}</form>
}
