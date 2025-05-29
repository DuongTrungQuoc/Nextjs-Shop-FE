import React, { useState } from 'react'

// ** next
import { NextPage } from 'next'

// ** MUI
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemTextProps,
  styled,
  Tooltip,
  useTheme
} from '@mui/material'

// ** component
import IconifyIcon from 'src/components/Icon'

// ** config
import { TVertical, VerticalItems } from 'src/configs/layout'
import { useRouter } from 'next/router'
import { hexToRGBA } from 'src/utils/hex-to-rgba'

type TProps = {}
type TListItems = {
  level: number
  items: any
  setActivePath: React.Dispatch<React.SetStateAction<string | null>>
  activePath: string | null
}
interface TListItemText extends ListItemTextProps {
  active: boolean
}
const StyleListItemText = styled(ListItemText)<TListItemText>(({ theme, active }) => ({
  '.MuiTypography-root.MuiTypography-body1.MuiListItemText-primary': {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: 'block',
    width: '100%',
    color: active ? `${theme.palette.primary.main} !important` : `rgba(${theme.palette.customColors.main},0.78)`,
    fontWeight: active ? '600' : '400'
  }
}))

// Hiển thị các mục theo dạng phân cấp
const RecursiveListItems: NextPage<TListItems> = ({ items, level, setActivePath, activePath }) => {
  const theme = useTheme()
  const router = useRouter()
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})

  const handleClick = (title: string) => {
    setOpenItems(prev => ({
      ...openItems, // Giữ nguyên các mục đã mở
      [title]: !prev[title]
    }))
  }

  console.log('activePath', { activePath })

  const handleSelectItem = (path: string) => {
    setActivePath(path)
    if (path) {
      router.push(path)
    }
  }

  const isParentHaveChildAcitve = (item: TVertical): boolean => {
    if (!item.childrens) {
      return item.path === activePath
    }

    return item.childrens.some((item: TVertical) => isParentHaveChildAcitve(item))
  }

  return (
    <>
      {items?.map((item: any) => {
        const isParentActive = isParentHaveChildAcitve(item)

        return (
          <React.Fragment key={item.title}>
            <ListItemButton
              sx={{
                padding: `8px 10px 8px ${level * 10}px`,
                margin: '1px 0 ',
                backgroundColor:
                  (activePath && item.path === activePath) || !!openItems[item.title] || isParentActive
                    ? `${hexToRGBA(theme.palette.primary.main, 0.08)} !important`
                    : theme.palette.background.paper
              }}
              onClick={() => {
                if (item.childrens) {
                  handleClick(item.title)
                }
                if (item.path) {
                  handleSelectItem(item.path)
                }
              }}
            >
              <ListItemIcon>
                <Box
                  sx={{
                    backgroundColor:
                      (activePath && item.path === activePath) || !!openItems[item.title] || isParentActive
                        ? `${theme.palette.primary.main} !important`
                        : theme.palette.background.paper,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px'
                  }}
                >
                  <IconifyIcon
                    style={{
                      color:
                        (activePath && item.path === activePath) || !!openItems[item.title] || isParentActive
                          ? `${theme.palette.customColors.lightPaperBg}`
                          : `rgba(${theme.palette.customColors.main},0.78)`
                    }}
                    icon={item?.icon}
                  />
                </Box>
              </ListItemIcon>
              <Tooltip title={item?.title}>
                <StyleListItemText
                  active={Boolean(
                    (activePath && item.path === activePath) || !!openItems[item.title] || isParentActive
                  )}
                  primary={item?.title}
                />
              </Tooltip>

              {item?.childrens && item.childrens.length > 0 && (
                <>
                  {openItems[item.title] ? (
                    <IconifyIcon
                      icon='lets-icons:expand-right'
                      style={{
                        transform: 'rotate(90deg)',
                        color:
                          !!openItems[item.title] || isParentActive
                            ? `${theme.palette.primary.main}`
                            : `rgba(${theme.palette.customColors.main},0.78)`
                      }}
                    />
                  ) : (
                    <IconifyIcon
                      icon='lets-icons:expand-right'
                      style={{
                        color: isParentActive
                          ? `${theme.palette.primary.main}`
                          : `rgba(${theme.palette.customColors.main},0.78)`
                      }}
                    />
                  )}
                </>
              )}
            </ListItemButton>
            {item.childrens && item.childrens.length > 0 && (
              <>
                <Collapse in={openItems[item.title]} timeout='auto' unmountOnExit>
                  <RecursiveListItems
                    items={item.childrens}
                    level={level + 1}
                    activePath={activePath}
                    setActivePath={setActivePath}
                  />
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
  const [activePath, setActivePath] = useState<null | string>('')

  const listVerticalItems = VerticalItems()

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', padding: 0 }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      <RecursiveListItems items={listVerticalItems} level={1} activePath={activePath} setActivePath={setActivePath} />
    </List>
  )
}

export default ListVerticalLayout
