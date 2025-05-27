// ** Next
import { NextPage } from 'next'
import { useRouter } from 'next/router'

// ** React
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

// ** MUI
import { Box, useTheme, Grid } from '@mui/material'
import { GridColDef, GridSortModel } from '@mui/x-data-grid'

// ** redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { resetInitialState } from 'src/stores/role'
import { deleteRoleAsync, getAllRolesAsync } from 'src/stores/role/actions'

// ** components
import Spinner from 'src/components/spinner'
import GridEdit from 'src/components/grid-edit'
import GridDelete from 'src/components/grid-delete'
import GridCreate from 'src/components/grid-create'
import InputSearch from 'src/components/input-search'
import CreateEditRole from './component/CreateEditRole'
import CustomPagination from 'src/components/custom-pagination'
import CustomDataGrid from 'src/components/custom-data-grid'
import ConfirmationDialog from 'src/components/confirmation-dialog'

// ** configs
import { PAGE_SIZE_OPTION } from 'src/configs/gridConfig'

type TProps = {}

const RoleListPage: NextPage<TProps> = () => {
  //State
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION[0])
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
    messageErrorDelete
  } = useSelector((state: RootState) => state.role)
  console.log('roles', { roles })

  // ** theme
  const theme = useTheme()

  // fetch api get all roles
  const handleGetListRoles = () => {
    dispatch(getAllRolesAsync({ params: { limit: -1, page: -1, search: searchBy, order: sortBy } }))
  }

  // handle
  const handleCloseConfirmDeleteRole = () => {
    setOpenDeleteRole({ open: false, id: '' })
  }

  const handleSort = (sort: GridSortModel) => {
    console.log('sort', { sort })
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
        //console.log('row', { row })

        return (
          <Box>
            {!row?.permissions?.some((per: string) => ['ADMIN.GRANTED', 'BASIC.PUBLIC']?.includes(per)) && (
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
            )}
          </Box>
        )
      }
    }
  ]

  // const PaginationComponent = () => {
  //   return (
  //     <CustomPagination
  //       onChangePagination={handleOnchangePagination}
  //       pageSizeOptions={PAGE_SIZE_OPTION}
  //       pageSize={pageSize}
  //       page={page}
  //       rowLength={roles.total}
  //     />
  //   )
  // }

  // Lấy danh sách roles khi component mount
  useEffect(() => {
    handleGetListRoles()
  }, [sortBy, searchBy])

  // Hiển thị thông báo khi tạo hoặc cập nhật thành công
  useEffect(() => {
    if (isSuccessCreateEdit) {
      if (openCreateEditRole.id) {
        toast.success(t('update-role-success'))
      } else {
        toast.success(t('create-role-success'))
      }
      handleGetListRoles()
      handleCloseCreateEdit()
      dispatch(resetInitialState())
    } else if (isErrorCreateEdit && messageErrorCreateEdit) {
      toast.error(t(messageErrorCreateEdit))
      dispatch(resetInitialState())
    }
  }, [isSuccessCreateEdit, isErrorCreateEdit, messageErrorCreateEdit])

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
      <ConfirmationDialog
        open={openDeleteRole.open}
        handleClose={handleCloseConfirmDeleteRole}
        handleCancel={handleCloseConfirmDeleteRole}
        handleConfirm={handleDeleteRole}
        title={t('title_delete_role')}
        description={t('confirm_delete_role')}
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
          <Grid item md={5} xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ width: '200px' }}>
                <InputSearch value={searchBy} onChange={(value: string) => setSearchBy(value)} />
              </Box>

              <GridCreate
                onClick={() =>
                  setOpenCreateEditRole({
                    open: true,
                    id: ''
                  })
                }
              />
            </Box>
            <CustomDataGrid
              rows={roles.data}
              columns={columns}
              getRowId={row => row._id}
              pageSizeOptions={[5]}
              //checkboxSelection
              autoHeight
              disableRowSelectionOnClick
              hideFooter
              sortingOrder={['desc', 'asc']}
              sortingMode='server'
              onSortModelChange={handleSort}
              // slots={{
              //   pagination: PaginationComponent
              // }}
              disableColumnFilter
              disableColumnMenu
            />
          </Grid>
          <Grid item md={7} xs={12}>
            List permission
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default RoleListPage
