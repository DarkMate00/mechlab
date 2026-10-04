import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'
import { Magnetic } from '../animations/Magnetic'
import { ArrowIcon } from './ArrowIcon'
import { buttonClasses, type ButtonSize, type ButtonVariant } from './buttonStyles'

interface SharedButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Adds a trailing arrow that moves on hover. */
  withArrow?: boolean
  /** Nudges the button toward the pointer. Use on at most one call to action per view. */
  magnetic?: boolean
}

function ButtonContent({ children, withArrow }: { children: ReactNode; withArrow?: boolean }) {
  return (
    <>
      {children}
      {withArrow ? <ArrowIcon /> : null}
    </>
  )
}

function MaybeMagnetic({ magnetic, children }: { magnetic?: boolean; children: ReactNode }) {
  return magnetic ? <Magnetic>{children}</Magnetic> : children
}

type ButtonProps = SharedButtonProps & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  variant = 'primary',
  size = 'md',
  withArrow,
  magnetic,
  type = 'button',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <MaybeMagnetic magnetic={magnetic}>
      <button type={type} className={buttonClasses(variant, size, className)} {...props}>
        <ButtonContent withArrow={withArrow}>{children}</ButtonContent>
      </button>
    </MaybeMagnetic>
  )
}

type ButtonLinkProps = SharedButtonProps & LinkProps

/** A router link that looks like a button. Use for navigation; use Button for actions. */
export function ButtonLink({
  variant = 'primary',
  size = 'md',
  withArrow,
  magnetic,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <MaybeMagnetic magnetic={magnetic}>
      <Link
        data-cursor="button"
        className={buttonClasses(variant, size, className)}
        {...props}
      >
        <ButtonContent withArrow={withArrow}>{children}</ButtonContent>
      </Link>
    </MaybeMagnetic>
  )
}
