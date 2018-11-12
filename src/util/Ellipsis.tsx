import * as React from 'react'

export default class Ellipsis extends React.PureComponent<
  // This wild guy was taken from @types/react
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >
> {
  render() {
    const { style, ...rest } = this.props

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
}
