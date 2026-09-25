import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useApiClient } from './api/client'
import { LoginButton } from './components/LoginButton'
import { LogoutButton } from './components/LogoutButton'
import { CycleHistory } from './components/CycleHistory'
import { DistanceTable } from './components/DistanceTable'
import './App.css'
import tiburonImg from './assets/tiburon.png'
import { NegotiationAdmin } from './components/NegotiationAdmin'
import { RejectedMessages } from './components/RejectedMessages'

function App() {
  const { isAuthenticated, isLoading, user } = useAuth0()
  const { apiFetch } = useApiClient()
  const [healthStatus, setHealthStatus] = useState(null)
  const [error, setError] = useState(null)
  const [activeView, setActiveView] = useState('history')

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
    <section id="center" style={{ padding: '40px 20px', gap: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img src={tiburonImg} alt="Silueta de tiburón" style={{ width: '160px', height: '150px' }} />
      <h1 style={{ margin: 0 }}>EnergyShark</h1>

      <div style={{ width: '100%', maxWidth: '400px' }}>
        {!isAuthenticated ? (
          <LoginButton />
        ) : (
          <>
            <LogoutButton />
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

      {isAuthenticated && (
        <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          
          {/* Navegación por pestañas */}
          <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '16px', width: '100%', justifyContent: 'center' }}>
            <button 
              onClick={() => setActiveView('history')}
              style={{ 
                background: activeView === 'history' ? 'var(--accent)' : 'var(--surface)', 
                color: activeView === 'history' ? 'var(--bg)' : 'var(--accent)' 
              }}
            >
              Historial de Ciclos
            </button>
            <button 
              onClick={() => setActiveView('distance')}
              style={{ 
                background: activeView === 'distance' ? 'var(--accent)' : 'var(--surface)', 
                color: activeView === 'distance' ? 'var(--bg)' : 'var(--accent)' 
              }}
            >
              Conectividad
            </button>
            <button 
              onClick={() => setActiveView('negotiations')}
              style={{ 
                background: activeView === 'negotiations' ? 'var(--accent)' : 'var(--surface)', 
                color: activeView === 'negotiations' ? 'var(--bg)' : 'var(--accent)' 
              }}
            >
              Negociaciones
            </button>

            <button 
              onClick={() => setActiveView('rejected')}
              style={{ 
                background: activeView === 'rejected' ? 'var(--accent)' : 'var(--surface)', 
                color: activeView === 'rejected' ? 'var(--bg)' : 'var(--accent)' 
              }}
            >
              Errores/NACKs
            </button>
          
          </div>


          {/* Renderizado condicional de las vistas */}
          {activeView === 'history' && <CycleHistory />}
          {activeView === 'distance' && <DistanceTable />}
          {activeView === 'negotiations' && <NegotiationAdmin />}
          {activeView === 'rejected' && <RejectedMessages />}
          
        </div>
      )}
    </section>
  )
}

export default App