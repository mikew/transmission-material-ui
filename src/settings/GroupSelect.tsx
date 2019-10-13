import { ListSubheader } from '@material-ui/core'
import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import Menu from '@material-ui/core/Menu/Menu'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import useSelector from '@src/redux/useSelector'
import React, { useState } from 'react'

import * as selectors from './selectors'

interface Props {
  onChange: (group: TorrentGroupDefinition) => void
  value?: TorrentGroupDefinition
}

// tslint:disable-next-line:function-name
function GroupSelect(props: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const groups = useSelector(selectors.getGroups)

  const handleMenuItemClick = (group: TorrentGroupDefinition) => {
    props.onChange(group)
    setAnchorEl(null)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
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
            <div key={groupName}>
              <ListSubheader>{groupName}</ListSubheader>
              {groups[groupName].map((location) => {
                return (
                  <MenuItem
                    key={location}
                    onClick={() => handleMenuItemClick({ groupName, location })}
                    selected={
                      props.value
                        ? location === props.value.location
                        : undefined
                    }
                  >
                    <ListItemText primary={location} />
                  </MenuItem>
                )
              })}
            </div>
          )
        })}
      </Menu>
    </React.Fragment>
  )
}

export default React.memo(GroupSelect)
