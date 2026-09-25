import distanceData from '../mocks/distance.json'

export function DistanceTable() {
  const { cityId, updatedAt, distances } = distanceData

  return (
    <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ textAlign: 'left' }}>
        <h2 style={{ marginBottom: '8px' }}>Conectividad de {cityId}</h2>
        <p style={{ color: 'var(--text)', margin: 0 }}>
          Última actualización: {new Date(updatedAt).toLocaleString()}
        </p>
      </div>

      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--surface-hover)', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '16px', color: 'var(--text-h)' }}>Destino</th>
              <th style={{ padding: '16px', color: 'var(--text-h)' }}>Distancia (m)</th>
              <th style={{ padding: '16px', color: 'var(--text-h)' }}>Costo (cr/kWh*km)</th>
              <th style={{ padding: '16px', color: 'var(--text-h)' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(distances).map(([destination, data]) => (
              <tr key={destination} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '16px', color: 'var(--accent)', fontWeight: 'bold' }}>
                  {destination}
                </td>
                <td style={{ padding: '16px' }}>{data.distance.toLocaleString()}</td>
                <td style={{ padding: '16px' }}>{data.transportCost}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    background: data.enabled ? 'var(--success-bg)' : '#ff6b6b33',
                    color: data.enabled ? 'var(--success)' : '#ff6b6b'
                  }}>
                    {data.enabled ? 'Habilitado' : 'Deshabilitado'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}