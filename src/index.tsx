import styles from './styles.module.less'

import React, { useState, useRef } from 'react'
import { Rnd } from 'react-rnd'
import classNames from 'classnames'

import {
  faMinusSquare,
  faBars,
  faPlusSquare,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const isResizeH = (d: string) => d.match('bottom')
const getHeight = (dom: HTMLElement) => dom.offsetHeight
const titleHeight = 28

interface Pos {
  x: number
  y: number
  width: number
  height: number
}

const defPos: Pos = { x: 0, y: 0, width: 320, height: 200 }

export type CompProps = {
  pos?: Partial<Pos>
  minWidth?: number
  children?: any
  style?: React.CSSProperties
  disableDragging?: boolean
  enableResizing?: boolean
  title?: string
  enableClose?: boolean
  onClose?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  className?: string
}
export type Comp = React.FC<CompProps>

const FloatPanel: Comp = ({
  pos = defPos,
  minWidth = 80,
  children,
  style = {},
  disableDragging = false,
  enableResizing = true,
  enableClose = false,
  title = '',
  onClose,
  className = ''
}) => {
  const [isOpen, setOpen] = useState(true)
  const [lastHeight, setLastHeight] = useState(200)
  const [startH, setStartH] = useState(0)
  const ref = useRef<Rnd>(null)

  const triggerOpen = () => {
    setOpen((open) => !open)

    // * ----------------

    const rnd = ref.current!.resizable
    if (!rnd) return

    let nextHeight
    if (isOpen) {
      setLastHeight(rnd.size.height)
      nextHeight = titleHeight
    } else {
      nextHeight = lastHeight
    }

    rnd.updateSize({ ...rnd.size, height: nextHeight })
  }

  const triggerClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClose && onClose(e)
  }

  const OpenIcon = (
    <div className='icon-button touchable' onClick={triggerOpen}>
      <FontAwesomeIcon
        className='icon'
        icon={isOpen ? faMinusSquare : faPlusSquare}
      />
    </div>
  )

  const CloseIcon = (
    <div className='icon-button touchable' onClick={triggerClose}>
      <FontAwesomeIcon className='icon' icon={faTimes} />
    </div>
  )

  return (
    <Rnd
      className={classNames(className, styles['e-float-window'])}
      style={style}
      default={{ ...defPos, ...pos }}
      minHeight={titleHeight}
      minWidth={minWidth}
      ref={ref}
      dragHandleClassName='titlebar'
      enableResizing={
        enableResizing && {
          bottomRight: true,
          right: true,
          bottom: true
        }
      }
      onResizeStart={(_e, _d, dom) => {
        setStartH(getHeight(dom))
      }}
      onResize={(_e, dir, _dom, delta) => {
        if (!isResizeH(dir)) return

        // drag open/close
        if (startH + delta.height === titleHeight) {
          isOpen && setOpen(false)
        } else {
          !isOpen && setOpen(true)
        }
      }}
      onResizeStop={(_, d, dom) => {
        if (!isResizeH(d)) return

        if (getHeight(dom) === titleHeight && startH !== titleHeight) {
          setLastHeight(startH)
        }
      }}
      disableDragging={disableDragging}
    >
      <div className='window-container'>
        <div className='titlebar'>
          <div className='icon-button'>
            <FontAwesomeIcon className='icon icon-menu' icon={faBars} />
          </div>
          <span className='title'>{title}</span>
          {enableClose ? CloseIcon : OpenIcon}
        </div>
        {children && (
          <div className='content' style={isOpen ? {} : { height: 0 }}>
            {children}
          </div>
        )}
      </div>
    </Rnd>
  )
}

export default FloatPanel
