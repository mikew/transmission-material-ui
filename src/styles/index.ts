import withStyles, {
  StyleRules,
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
//     import {
//       createStyles,
//       Theme,
//       withStyles,
//       WithStyles,
//     } from '@material-ui/core'
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
//     import { appStyles, AppStyles } from '@src/styles'
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

export function appStyles<C extends string>(
  style: StyleRules<C> | StyleRulesCallback<C>,
) {
  return withStyles(style)
}

export type AppStyles<T> = T extends PropInjector<infer K> ? K : never
