import { useState } from 'react'
import negotiationMock from '../mocks/negotiation.json'

export function NegotiationAdmin() {
  const [negotiations, setNegotiations] = useState(negotiationMock)
  const [formData, setFormData] = useState({
    cycleId: 'cycle-9431',
    direction: 'take',
    quantity: '',
    pricePerEnergy: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const newProposal = {
      id: Date.now(),
      cycleId: formData.cycleId,
      idpk: crypto.randomUUID(),
      direction: formData.direction,
      quantity: Number(formData.quantity),
      pricePerEnergy: Number(formData.pricePerEnergy),
      settledPricePerEnergy: null,
      status: 'proposed',
      proposedAt: new Date().toISOString(),
      confirmedAt: null,
      paidAt: null
    }
    setNegotiations([newProposal, ...negotiations])
    setFormData({ ...formData, quantity: '', pricePerEnergy: '' })
  }

  return (
    <div style={{ width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
        <h2 style={{ marginTop: 0, textAlign: 'left' }}>Crear Propuesta de Negociación</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', flex: 1 }}>
            <label style={{ fontSize: '14px', marginBottom: '8px', color: 'var(--text-h)' }}>Ciclo</label>
            <input 
              type="text" 
              value={formData.cycleId}
              onChange={e => setFormData({...formData, cycleId: e.target.value})}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
              required 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', flex: 1 }}>
            <label style={{ fontSize: '14px', marginBottom: '8px', color: 'var(--text-h)' }}>Dirección</label>
            <select 
              value={formData.direction}
              onChange={e => setFormData({...formData, direction: e.target.value})}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
            >
              <option value="take">Comprar (Take)</option>
              <option value="give">Vender (Give)</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', flex: 1 }}>
            <label style={{ fontSize: '14px', marginBottom: '8px', color: 'var(--text-h)' }}>Cantidad (kWh)</label>
            <input 
              type="number" 
              value={formData.quantity}
              onChange={e => setFormData({...formData, quantity: e.target.value})}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
              required min="1"
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', flex: 1 }}>
            <label style={{ fontSize: '14px', marginBottom: '8px', color: 'var(--text-h)' }}>Precio (cr)</label>
            <input 
              type="number" 
              value={formData.pricePerEnergy}
              onChange={e => setFormData({...formData, pricePerEnergy: e.target.value})}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
              required min="1" step="0.01"
            />
          </div>
          <button type="submit" style={{ height: '42px' }}>Proponer</button>
        </form>
      </div>

      <div style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--surface-hover)', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '16px', color: 'var(--text-h)' }}>ID / Ciclo</th>
              <th style={{ padding: '16px', color: 'var(--text-h)' }}>Tipo</th>
              <th style={{ padding: '16px', color: 'var(--text-h)' }}>Energía</th>
              <th style={{ padding: '16px', color: 'var(--text-h)' }}>Precio Ofertado</th>
              <th style={{ padding: '16px', color: 'var(--text-h)' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {negotiations.map((neg) => (
              <tr key={neg.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '16px' }}>
                  <span style={{ color: 'var(--text-h)' }}>#{neg.id}</span><br/>
                  <span style={{ fontSize: '12px' }}>{neg.cycleId}</span>
                </td>
                <td style={{ padding: '16px', color: 'var(--accent)' }}>{neg.direction.toUpperCase()}</td>
                <td style={{ padding: '16px' }}>{neg.quantity} kWh</td>
                <td style={{ padding: '16px' }}>{neg.pricePerEnergy} cr</td>
                <td style={{ padding: '16px' }}>
                  <span style={{ 
                    padding: '4px 8px', borderRadius: '4px', fontSize: '14px',
                    background: neg.status === 'confirmed' || neg.status === 'paid' ? 'var(--success-bg)' : 'rgba(255, 255, 255, 0.1)',
                    color: neg.status === 'confirmed' || neg.status === 'paid' ? 'var(--success)' : 'var(--text-h)'
                  }}>
                    {neg.status}
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