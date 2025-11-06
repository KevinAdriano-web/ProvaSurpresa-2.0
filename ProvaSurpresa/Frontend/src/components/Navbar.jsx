import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <h2>Prova Surpresa</h2>
      <div>
        <span style={{ marginRight: '1rem' }}>
          {user?.email} ({user?.role})
        </span>
        <Link to="/">Provas</Link>
        <Link to="/minhas-respostas">Minhas Respostas</Link>
        {user?.role === 'professor' && (
          <Link to="/provas/criar">Criar Prova</Link>
        )}
        <button onClick={handleLogout}>Sair</button>
      </div>
    </nav>
  )
}

export default Navbar
