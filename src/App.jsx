import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useApiClient } from './api/client'
import { LoginButton } from './components/LoginButton'
import { LogoutButton } from './components/LogoutButton'
import './App.css'
import tiburonImg from './assets/tiburon.png'


function App() {
  const { isAuthenticated, isLoading, user } = useAuth0()
  const { apiFetch } = useApiClient()
  const [healthStatus, setHealthStatus] = useState(null)
  const [error, setError] = useState(null)

  async function checkHealth() {
    setError(null)
    setHealthStatus(null)
    try {
      const data = await apiFetch('/health')
      setHealthStatus(JSON.stringify(data))
    } catch (err) {
      setError(err.message)
    }
  }

  if (isLoading) return <p>Cargando Auth0...</p>

  return (
    <section id="center" style={{ padding: '40px 20px', gap: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img src={tiburonImg} alt="Silueta de tiburón" style={{ width: '160px', height: '150px' }} />
      <h1>EnergyShark</h1>


      <div >
        <LoginButton />
        <LogoutButton />

        {isAuthenticated && (
          <>
            <p style={{ marginTop: '16px', color: 'var(--text-h)' }}>
              Sesión iniciada como {user?.email}
            </p>
            <button onClick={checkHealth} style={{ marginTop: '16px' }}>
              Probar /health con token
            </button>
          </>
        )}

        {healthStatus && (
          <p style={{ marginTop: '16px', color: 'var(--success)' }}>OK: {healthStatus}</p>
        )}
        {error && (
          <p style={{ marginTop: '16px', color: '#ff6b6b' }}>Error: {error}</p>
        )}
      </div>
    </section>
  )
}

export default App