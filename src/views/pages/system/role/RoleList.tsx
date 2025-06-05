// ** Next
import { NextPage } from 'next'

// ** React
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

// ** MUI
import { Box, useTheme, Grid, Button } from '@mui/material'
import { GridColDef, GridRowClassNameParams, GridSortModel } from '@mui/x-data-grid'

// ** redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { resetInitialState } from 'src/stores/role'
import { deleteRoleAsync, getAllRolesAsync, updateRoleAsync } from 'src/stores/role/actions'

// ** components
import Spinner from 'src/components/spinner'
import GridEdit from 'src/components/grid-edit'
import GridDelete from 'src/components/grid-delete'
import GridCreate from 'src/components/grid-create'
import InputSearch from 'src/components/input-search'
import CreateEditRole from './component/CreateEditRole'
import CustomDataGrid from 'src/components/custom-data-grid'
import ConfirmationDialog from 'src/components/confirmation-dialog'
import IconifyIcon from 'src/components/Icon'
import TablePermission from './component/TablePermission'

// ** Services
import { getDetailsRole } from 'src/services/role'

// ** Utils
import { getAllValueOfObject } from 'src/utils'
import { hexToRGBA } from 'src/utils/hex-to-rgba'

// ** configs
import { OBJECT_TYPE_ERROR_ROLE } from 'src/configs/role'
import { PERMISSIONS } from 'src/configs/permission'

type TProps = {}

const RoleListPage: NextPage<TProps> = () => {
  //State
  const [openCreateEditRole, setOpenCreateEditRole] = useState({
    open: false,
    id: ''
  })
  const [openDeleteRole, setOpenDeleteRole] = useState({
    open: false,
    id: ''
  })
  const [sortBy, setSortBy] = useState('created asc')
  const [searchBy, setSearchBy] = useState('')
  const [permissionSelected, setPermissionSelected] = useState<string[]>([])
  const [selectedRow, setSelectedRow] = useState({
    id: '',
    name: ''
  })
  const [loading, setLoading] = useState(false)
  const [isDisablePermission, setIsDisablePermission] = useState(false)

  // ** tranlate
  const { t } = useTranslation()

  // ** redux
  const dispatch: AppDispatch = useDispatch()
  const {
    roles,
    isSuccessCreateEdit,
    isErrorCreateEdit,
    isLoading,
    messageErrorCreateEdit,
    isErrorDelete,
    isSuccessDelete,
    messageErrorDelete,
    typeError
  } = useSelector((state: RootState) => state.role)

  // ** theme
  const theme = useTheme()

  // fetch api get all roles
  const handleGetListRoles = () => {
    dispatch(getAllRolesAsync({ params: { limit: -1, page: -1, search: searchBy, order: sortBy } }))
  }

  const handleUpdateRole = () => {
    dispatch(updateRoleAsync({ name: selectedRow.name, id: selectedRow.id, permissions: permissionSelected }))
  }

  // handle
  const handleCloseConfirmDeleteRole = () => {
    setOpenDeleteRole({ open: false, id: '' })
  }

  const handleSort = (sort: GridSortModel) => {
    const sortOption = sort[0]
    setSortBy(`${sortOption.field} ${sortOption.sort}`)
  }

  const handleCloseCreateEdit = () => {
    setOpenCreateEditRole({ open: false, id: '' })
  }

  const handleDeleteRole = () => {
    if (openDeleteRole.id) {
      dispatch(deleteRoleAsync(openDeleteRole.id))
    }
  }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: t('Name'),
      flex: 1
    },
    {
      field: 'action',
      headerName: t('Actions'),
      minWidth: 150,
      sortable: false,
      align: 'left',
      renderCell: params => {
        const { row } = params

        return (
          <Box sx={{ width: '100%' }}>
            {!row?.permissions?.some((per: string) => ['ADMIN.GRANTED', 'BASIC.PUBLIC']?.includes(per)) ? (
              <>
                <GridEdit
                  onClick={() =>
                    setOpenCreateEditRole({
                      open: true,
                      id: String(params.id)
                    })
                  }
                />
                <GridDelete
                  onClick={() =>
                    setOpenDeleteRole({
                      open: true,
                      id: String(params.id)
                    })
                  }
                />
              </>
            ) : (
              <IconifyIcon icon='mdi-light:lock' fontSize={30} />
            )}
          </Box>
        )
      }
    }
  ]

  // fetch API
  const handleGetDetailsRole = async (id: string) => {
    setLoading(true)
    await getDetailsRole(id)
      .then(res => {
        if (res?.data) {
          if (res?.data.permissions.includes(PERMISSIONS.ADMIN)) {
            setIsDisablePermission(true)
            setPermissionSelected(getAllValueOfObject(PERMISSIONS, [PERMISSIONS.ADMIN, PERMISSIONS.BASIC]))
          } else if (res?.data.permissions.includes(PERMISSIONS.BASIC)) {
            setIsDisablePermission(true)
            setPermissionSelected([PERMISSIONS.DASHBOARD])
          } else {
            setIsDisablePermission(false)
            setPermissionSelected(res?.data?.permissions || [])
          }
        }
        setLoading(false)
      })
      .catch(e => {
        setLoading(false)
      })
  }

  // Lấy danh sách roles khi component mount
  useEffect(() => {
    handleGetListRoles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, searchBy])

  useEffect(() => {
    if (selectedRow.id) {
      handleGetDetailsRole(selectedRow.id)
    }
  }, [selectedRow])

  // Hiển thị thông báo khi tạo hoặc cập nhật thành công
  useEffect(() => {
    if (isSuccessCreateEdit) {
      if (!openCreateEditRole.id) {
        toast.success(t('Create_role_success'))
      } else {
        toast.success(t('Update_role_success'))
      }
      handleGetListRoles()
      handleCloseCreateEdit()
      dispatch(resetInitialState())
    } else if (isErrorCreateEdit && messageErrorCreateEdit && typeError) {
      const errorConfig = OBJECT_TYPE_ERROR_ROLE[typeError]
      if (errorConfig) {
        toast.error(t(errorConfig))
      } else {
        if (openCreateEditRole.id) {
          toast.error(t('Update_role_error'))
        } else {
          toast.error(t('Create_role_error'))
        }
      }

      dispatch(resetInitialState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessCreateEdit, isErrorCreateEdit, messageErrorCreateEdit, typeError])

  // Hiển thị thông báo khi xóa thành công
  useEffect(() => {
    if (isSuccessDelete) {
      toast.success(t('delete-role-success'))
      handleGetListRoles()
      dispatch(resetInitialState())
      handleCloseConfirmDeleteRole()
    } else if (isErrorDelete && messageErrorDelete) {
      toast.error(t(messageErrorDelete))
      dispatch(resetInitialState())
    }
  }, [isSuccessDelete, isErrorDelete, messageErrorDelete])

  return (
    <>
      {loading && <Spinner />}
      <ConfirmationDialog
        open={openDeleteRole.open}
        handleClose={handleCloseConfirmDeleteRole}
        handleCancel={handleCloseConfirmDeleteRole}
        handleConfirm={handleDeleteRole}
        title={t('Title_delete_role')}
        description={t('Confirm_delete_role')}
      />
      <CreateEditRole open={openCreateEditRole.open} onClose={handleCloseCreateEdit} idRole={openCreateEditRole.id} />
      {isLoading && <Spinner />}
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          alignItems: 'center',
          padding: '20px',
          height: '100%'
        }}
      >
        <Grid container sx={{ height: '100%', width: '100%' }}>
          <Grid item md={4} xs={12} sx={{ maxHeight: '90%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ width: '200px' }}>
                <InputSearch value={searchBy} onChange={(value: string) => setSearchBy(value)} />
              </Box>

              <GridCreate
                onClick={() => {
                  setOpenCreateEditRole({
                    open: true,
                    id: ''
                  })
                }}
              />
            </Box>
            <CustomDataGrid
              rows={roles.data}
              columns={columns}
              getRowId={row => row._id}
              pageSizeOptions={[5]}
              autoHeight
              sx={{
                '.row-selected': {
                  backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.08)} !important`,
                  color: `${theme.palette.primary.main}`
                }
              }}
              disableRowSelectionOnClick
              hideFooter
              sortingOrder={['desc', 'asc']}
              sortingMode='server'
              onSortModelChange={handleSort}
              getRowClassName={(row: GridRowClassNameParams) => {
                return row.id === selectedRow.id ? 'row-selected' : ''
              }}
              onRowClick={row => {
                setSelectedRow({ id: String(row.id), name: row?.row?.name })
                setOpenCreateEditRole({
                  open: false,
                  id: String(row.id)
                })
              }}
              disableColumnFilter
              disableColumnMenu
            />
          </Grid>
          <Grid
            item
            md={8}
            xs={12}
            sx={{ maxHeight: '100%' }}
            paddingLeft={{ md: 5, xs: 0 }}
            paddingTop={{ md: 0, xs: 5 }}
          >
            {selectedRow?.id && (
              <>
                <Box sx={{ maxHeight: 'calc(100% - 40px)', overflow: 'auto' }}>
                  <TablePermission
                    permissionSelected={permissionSelected}
                    setPermissionSelected={setPermissionSelected}
                    disable={isDisablePermission}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                  <Button
                    disabled={isDisablePermission}
                    type='submit'
                    variant='contained'
                    sx={{ mt: 3 }}
                    onClick={handleUpdateRole}
                  >
                    {t('Update')}
                  </Button>
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default RoleListPage
