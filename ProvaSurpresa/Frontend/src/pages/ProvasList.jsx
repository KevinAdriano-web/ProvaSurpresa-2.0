import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import api from '../services/api'

function ProvasList() {
  const [provas, setProvas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    loadProvas()
  }, [])

  const loadProvas = async () => {
    try {
      setLoading(true)
      const response = await api.get('/provas')
      setProvas(response.data)
    } catch (err) {
      console.error(err)
      setError('Erro ao carregar provas')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="app">
      <nav className="navbar">
        <h2>Prova Surpresa</h2>
        <div>
          <span style={{ marginRight: '1rem' }}>
            Olá, {user?.email} ({user?.role})
          </span>
          <Link to="/minhas-respostas">Minhas Respostas</Link>
          {user?.role === 'professor' && (
            <Link to="/provas/criar">Criar Prova</Link>
          )}
          <button onClick={handleLogout}>Sair</button>
        </div>
      </nav>

      <div className="container">
        <h1>Provas Disponíveis</h1>
        
        {error && <div className="error">{error}</div>}
        
        {loading ? (
          <p>Carregando provas...</p>
        ) : provas.length === 0 ? (
          <p>Nenhuma prova disponível no momento.</p>
        ) : (
          <div className="grid grid-2">
            {provas.map((prova) => (
              <div key={prova.id} className="card">
                <h3>{prova.titulo}</h3>
                <p>
                  Criada por: {prova.login_email || 'Desconhecido'}
                </p>
                <p>
                  Perguntas: {prova.perguntas?.length || 0}
                </p>
                <Link to={`/provas/${prova.id}`}>
                  <button className="btn">Ver Prova</button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProvasList
