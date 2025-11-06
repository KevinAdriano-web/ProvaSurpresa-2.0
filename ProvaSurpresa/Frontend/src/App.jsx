import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import ProvasList from './pages/ProvasList'
import ProvaForm from './pages/ProvaForm'
import ProvaView from './pages/ProvaView'
import MinhasRespostas from './pages/MinhasRespostas'
import './App.css'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ProvasList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/provas/criar"
            element={
              <ProtectedRoute>
                <ProvaForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/provas/:id"
            element={
              <ProtectedRoute>
                <ProvaView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/minhas-respostas"
            element={
              <ProtectedRoute>
                <MinhasRespostas />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
