import React, { useState } from 'react'

// ** next
import { NextPage } from 'next'

// ** MUI
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

// ** component
import IconifyIcon from 'src/components/Icon'

// ** config
import { VerticalItems } from 'src/configs/layout'

type TProps = {}

const RecursiveListItems = ({ items, level }: { items: any; level: number }) => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})

  const handleClick = (title: string) => {
    setOpenItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  return (
    <>
      {items?.map((item: any) => {
        return (
          <React.Fragment key={item.title}>
            <ListItemButton
              sx={{
                padding: `8px 10px 8px ${level * 10}px`
              }}
              onClick={() => {
                if (item.childrens) {
                  handleClick(item.title)
                }
              }}
            >
              <ListItemIcon>
                <IconifyIcon icon={item?.icon} />
              </ListItemIcon>
              <ListItemText primary={item?.title} />
              {item?.childrens && item.childrens.length > 0 && (
                <>
                  {openItems[item.title] ? (
                    <IconifyIcon
                      icon='lets-icons:expand-right'
                      style={{
                        transform: 'rotate(90deg)'
                      }}
                    />
                  ) : (
                    <IconifyIcon icon='lets-icons:expand-right' />
                  )}
                </>
              )}
            </ListItemButton>
            {item.childrens && item.childrens.length > 0 && (
              <>
                <Collapse in={openItems[item.title]} timeout='auto' unmountOnExit>
                  <RecursiveListItems items={item.childrens} level={level + 1} />
                </Collapse>
              </>
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}

const ListVerticalLayout: NextPage<TProps> = () => {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      <RecursiveListItems items={VerticalItems} level={1} />
    </List>
  )
}

export default ListVerticalLayout
