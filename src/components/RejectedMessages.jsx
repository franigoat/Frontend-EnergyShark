import rejectedData from '../mocks/rejected.json'

export function RejectedMessages() {
  return (
    <div style={{ width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ textAlign: 'left' }}>
        <h2 style={{ marginBottom: '8px' }}>Registro de Duplicados y NACKs</h2>
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
              <th style={{ padding: '16px', color: 'var(--text-h)' }}>Tipo (Kind)</th>
              <th style={{ padding: '16px', color: 'var(--text-h)' }}>Razón</th>
              <th style={{ padding: '16px', color: 'var(--text-h)' }}>Código</th>
              <th style={{ padding: '16px', color: 'var(--text-h)' }}>Detalle</th>
              <th style={{ padding: '16px', color: 'var(--text-h)' }}>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {rejectedData.map((msg) => (
              <tr key={msg.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '16px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '14px',
                    background: msg.kind === 'duplicate' ? 'rgba(255, 193, 7, 0.15)' : '#ff6b6b33',
                    color: msg.kind === 'duplicate' ? '#ffc107' : '#ff6b6b'
                  }}>
                    {msg.kind.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '16px', color: 'var(--text-h)' }}>{msg.reason || '-'}</td>
                <td style={{ padding: '16px' }}>{msg.code || '-'}</td>
                <td style={{ padding: '16px' }}>{msg.detail}</td>
                <td style={{ padding: '16px' }}>{new Date(msg.occurredAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}