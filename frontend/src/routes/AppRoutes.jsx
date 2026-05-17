import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import Login from '../pages/Login'
import Register from '../pages/Register'
import Chat from '../pages/Chat'

function PrivateRoute({ children }) {

  const token = localStorage.getItem(
    'token'
  )

  if (!token) {

    return <Navigate to="/login" />
  }

  return children
}

export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/chat"
          element={
            <PrivateRoute>

              <Chat />

            </PrivateRoute>
          }
        />

        <Route
          path="*"
          element={
            <Navigate to="/login" />
          }
        />

      </Routes>

    </BrowserRouter>
  )
}