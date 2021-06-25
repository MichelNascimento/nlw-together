import { ButtonHTMLAttributes } from 'react'

import '../styles/button.scss'

// utilizando o "ButtonHTMLAttributes" do React na tipagem 
// para podermos utilizar todos os atributos que um 
// button do HTML possui
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps) {
  return (
    <button className="button" {...props} />
  )
}
