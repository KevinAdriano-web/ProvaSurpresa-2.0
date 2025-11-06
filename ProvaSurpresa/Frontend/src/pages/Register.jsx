import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Register() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmSenha, setConfirmSenha] = useState('')
  const [role, setRole] = useState('aluno')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (senha !== confirmSenha) {
      setError('As senhas não coincidem')
      return
    }

    if (senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      return
    }

    setLoading(true)

    try {
      await register(email, senha, role)
      navigate('/login')
    } catch (err) {
      console.error(err)
      if (err.response?.data?.error === 'email_exists') {
        setError('Este email já está cadastrado')
      } else {
        setError('Erro ao criar conta. Tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Registrar - Prova Surpresa</h2>
        
        {error && <div className="error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              disabled={loading}
              minLength={6}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmSenha"
              value={confirmSenha}
              onChange={(e) => setConfirmSenha(e.target.value)}
              required
              disabled={loading}
              minLength={6}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="role">Tipo de Conta</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
            >
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
            </select>
          </div>
          
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>
        
        <p>
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
