import withStyles, {
  StyleRulesCallback,
} from '@material-ui/core/styles/withStyles'
import { PropInjector } from '@material-ui/types'

export { Theme } from '@material-ui/core/styles/createMuiTheme'
export { default as createStyles } from '@material-ui/core/styles/createStyles'
export {
  default as withStyles,
  CSSProperties,
  WithStyles,
} from '@material-ui/core/styles/withStyles'

// Easy overloads for using material-uis style system.
// before:
//
//     const styles = (theme: Theme) =>
//       createStyles({
//         appBar: {
//           ...,
//         },
//       })
//
//     function MyComponent(props: WithStyles<typeof styles>) {
//       return ...
//     }
//
//     export default withStyles(styles)(MyComponent)
//
// after:
//
//     const styles = appStyles((theme: Theme) => ({
//       appBar: {
//         ...,
//       },
//     }))
//
//     function MyComponent(props: AppStyles<typeof styles>) {
//       return ...
//     }
//
//     export default styles(MyComponent)

export function appStyles<C extends string>(style: StyleRulesCallback<C>) {
  return withStyles(style)
}

// export type AppStyles<T> = T extends PropInjector<WithStyles<infer K>, any>
//   ? K extends string
//     ? { classes: ClassNameMap<K> }
//     : never
//   : never

export type AppStyles<T> = T extends PropInjector<infer K> ? K : never
