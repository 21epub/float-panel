import styles from './styles.module.less'

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
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

interface Pos {
  x: number
  y: number
  width: number | string
  height: number | string
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
  titleBarStyle?: React.CSSProperties
  titleHeight?: number
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
  className = '',
  titleHeight = 22,
  titleBarStyle = {
    height: titleHeight
  }
}) => {
  const [isOpen, setOpen] = useState(true)
  const [maxHeight, setMaxHeight] = useState<number | string>('initial')
  const [lastHeight, setLastHeight] = useState(200)
  const [startH, setStartH] = useState(0)
  const ref = useRef<Rnd>(null)

  const adjustHeight = useCallback(() => {
    if (ref?.current) {
      const _pos = ref?.current?.getSelfElement()?.getBoundingClientRect()
      const windowHeight = document.documentElement.clientHeight
      const top = _pos?.top || 0

      // if (_pos && windowHeight - top <= _pos.height) {
      setMaxHeight(windowHeight - top - titleHeight)
      // } else {
      //   setMaxHeight('initial')
      // }
    }
  }, [])

  useEffect(() => {
    adjustHeight()
  }, [])

  const iconStyle = useMemo(
    () => ({
      width: titleHeight,
      height: titleHeight
    }),
    [titleHeight]
  )

  const triggerOpen = useCallback(() => {
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
  }, [isOpen])

  const triggerClose = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      onClose && onClose(e)
    },
    [onClose]
  )

  const OpenIcon = useMemo(
    () => (
      <div
        className='icon-button touchable'
        onClick={triggerOpen}
        style={iconStyle}
      >
        <FontAwesomeIcon
          className='icon'
          icon={isOpen ? faMinusSquare : faPlusSquare}
        />
      </div>
    ),
    [triggerOpen, iconStyle]
  )

  const CloseIcon = useMemo(
    () => (
      <div
        className='icon-button touchable'
        onClick={triggerClose}
        style={iconStyle}
      >
        <FontAwesomeIcon className='icon' icon={faTimes} />
      </div>
    ),
    [triggerClose, iconStyle]
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
      onDragStop={() => {
        adjustHeight()
      }}
    >
      <div className='window-container'>
        <div className='titlebar' style={titleBarStyle}>
          <div className='icon-button' style={iconStyle}>
            <FontAwesomeIcon className='icon icon-menu' icon={faBars} />
          </div>
          <span className='title'>{title}</span>
          {enableClose ? CloseIcon : OpenIcon}
        </div>
        {children && (
          <div
            className='content'
            style={isOpen ? { maxHeight } : { height: 0 }}
          >
            {children}
          </div>
        )}
      </div>
    </Rnd>
  )
}

export default FloatPanel
