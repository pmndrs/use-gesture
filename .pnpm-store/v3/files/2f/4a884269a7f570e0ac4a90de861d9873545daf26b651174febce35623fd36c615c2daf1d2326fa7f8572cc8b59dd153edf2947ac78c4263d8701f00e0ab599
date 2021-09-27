import React, { useCallback } from 'react'
import { Label, Portal, Overlay, Row } from '../UI'
import { useDropzone } from 'react-dropzone'
import { DropZone, ImageContainer, ImagePreview, Instructions, ImageLargePreview, Remove } from './StyledImage'
import { useInputContext } from '../../context'
import { usePopin } from '../../hooks'
import type { ImageProps } from './image-types'

export function ImageComponent() {
  const { label, value, onUpdate } = useInputContext<ImageProps>()
  const { popinRef, wrapperRef, shown, show, hide } = usePopin()

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length) onUpdate(acceptedFiles[0])
    },
    [onUpdate]
  )

  const clear = useCallback(
    (e) => {
      e.stopPropagation()
      onUpdate(undefined)
    },
    [onUpdate]
  )

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({ maxFiles: 1, accept: 'image/*', onDrop })

  // TODO fix any in DropZone
  return (
    <Row input>
      <Label>{label}</Label>
      <ImageContainer>
        <ImagePreview
          ref={popinRef}
          hasImage={!!value}
          onPointerDown={() => !!value && show()}
          onPointerUp={hide}
          style={{ backgroundImage: value ? `url(${value})` : 'none' }}
        />
        {shown && !!value && (
          <Portal>
            <Overlay onPointerUp={hide} style={{ cursor: 'pointer' }} />
            <ImageLargePreview ref={wrapperRef} style={{ backgroundImage: `url(${value})` }} />
          </Portal>
        )}
        <DropZone {...(getRootProps({ isDragAccept }) as any)}>
          <input {...getInputProps()} />
          <Instructions>{isDragAccept ? 'drop image' : 'click or drop'}</Instructions>
        </DropZone>
        <Remove onClick={clear} disabled={!value} />
      </ImageContainer>
    </Row>
  )
}
