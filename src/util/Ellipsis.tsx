import { memo } from 'react'

function Ellipsis(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >,
) {
  const { style, ...rest } = props

  return (
    <span
      {...rest}
      style={{
        display: 'inherit',
        ...style,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        // minWidth: 0,
      }}
    />
  )
}

export default memo(Ellipsis)
