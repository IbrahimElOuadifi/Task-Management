import { useEffect, FC } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import MainLayout from '@layouts/main'
import { useAuth } from 'hooks/index'
import { Spinner } from '@components/ui/spinner'
import { usePOSTData } from 'hooks/index'
import { getMembers } from 'api/members'
import { getLabels } from 'api/labels'
import { setMembers } from '@store-actions/membersSlice'
import { setLabels } from '@store-actions/labelsSlice'
import { IMember } from '@interfaces/User'
import { ILabel } from '@interfaces/Label'

const Private: FC = () => {

  const { user, loading, logout } = useAuth()
  const dispatch = useDispatch()

  const { postData: loadMembers } = usePOSTData(getMembers, ({ data }: { data: IMember[] }) => dispatch(setMembers(data)))
  const { postData: loadLabels } = usePOSTData(getLabels, ({ data }: { data: ILabel[] }) => dispatch(setLabels(data)))


  useEffect(() => {
    if(!user) return

    loadMembers({})
    loadLabels({})
  }, [user])

  if(!user && loading) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-100 bg-opacity-50">
      <Spinner />
    </div>
  )

  return (
    <MainLayout handleLogout={logout}>
      <Outlet />
    </MainLayout>
  )
}
  
export default Private