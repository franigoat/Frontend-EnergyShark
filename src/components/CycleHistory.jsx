import cyclesData from '../mocks/cycles.json'

export function CycleHistory() {
  return (
    <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h2 style={{ textAlign: 'left', marginBottom: '0' }}>Historial de Ciclos</h2>
      
      {cyclesData.map((cycle) => (
        <div key={cycle.cycleId} style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'left',
          boxShadow: 'var(--shadow)'
        }}>
          <h3 style={{ color: 'var(--accent)', marginTop: 0 }}>{cycle.cycleId}</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <h4 style={{ color: 'var(--text-h)', marginBottom: '8px' }}>Status Statement</h4>
              <p>Generación: {cycle.statusStatement.generationCapacity} kWh</p>
              <p>Consumo: {cycle.statusStatement.consumption} kWh</p>
              <p>Costo base: {cycle.statusStatement.generationCost} cr</p>
            </div>

            <div>
              <h4 style={{ color: 'var(--text-h)', marginBottom: '8px' }}>Balances Finales</h4>
              <p>Presupuesto: <span style={{ color: 'var(--success)' }}>{cycle.report.budgetBalance} cr</span></p>
              <p>Energía: {cycle.report.energyBalance} kWh</p>
            </div>
          </div>

          <hr style={{ borderColor: 'var(--border)', margin: '16px 0' }} />

          <h4 style={{ color: 'var(--text-h)', marginBottom: '8px' }}>Operaciones</h4>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {cycle.transfers.map((t, i) => (
              <li key={`t-${i}`}>Transferencia ({t.type}): {t.quantity} cr</li>
            ))}
            {cycle.demandStatements.map((d, i) => (
              <li key={`d-${i}`}>Demand Statement: {d.quantity} kWh a {d.valuePerKwh} cr</li>
            ))}
            {cycle.negotiations.map((n, i) => (
              <li key={`n-${i}`}>
                Negociación ({n.direction}): {n.quantity} kWh a {n.pricePerEnergy} cr - <strong>{n.status}</strong>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}