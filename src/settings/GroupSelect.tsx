import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Fragment, memo, useState } from 'react'

import { useRootSelector } from '@src/redux/helpers'

import * as selectors from './selectors'

interface Props {
  onChange: (group: TorrentGroupDefinition) => void
  value?: TorrentGroupDefinition
}

function GroupSelect(props: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const groups = useRootSelector(selectors.getGroups)

  const handleMenuItemClick = (group: TorrentGroupDefinition) => {
    props.onChange(group)
    setAnchorEl(null)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <List>
        <ListItem button={true} onClick={handleClickListItem}>
          <ListItemText
            primary={props.value ? props.value.location : 'Choose location'}
            secondary={props.value ? props.value.groupName : undefined}
          />
        </ListItem>
      </List>
      <Menu
        MenuListProps={{ dense: true }}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
      >
        {Object.keys(groups).map((groupName) => {
          return (
            <Fragment key={groupName}>
              {groups[groupName].map((location) => {
                return (
                  <MenuItem
                    key={location}
                    divider
                    onClick={() => handleMenuItemClick({ groupName, location })}
                    selected={
                      props.value
                        ? location === props.value.location
                        : undefined
                    }
                  >
                    <ListItemText primary={location} secondary={groupName} />
                  </MenuItem>
                )
              })}
            </Fragment>
          )
        })}
      </Menu>
    </>
  )
}

export default memo(GroupSelect)
