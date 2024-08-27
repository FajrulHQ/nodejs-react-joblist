import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import AuthPage from "../pages/auth";
import RecruitmentPositionPage from "../pages/recruitment/position";
import RecruitmentPositionDetailPage from "../pages/recruitment/position_detail";

const autoRedirect = (component, target_path, trigger) => (
  trigger ? component : <Navigate replace to={target_path} />
)
const isLogged = localStorage.getItem('token')

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        index: true,
        element: autoRedirect(<AuthPage />, '/app?full_time=true', !isLogged),
      },
      {
        path: 'app',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: autoRedirect(<RecruitmentPositionPage />, '/', isLogged),
          },
          {
            path: ':id',
            element: autoRedirect(<RecruitmentPositionDetailPage />, '/', isLogged),
          }
        ]
      }
    ]
  }
])

export default routes;