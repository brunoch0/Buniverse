import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useLang } from '../../i18n/LanguageContext'
import { AREA_COORDS, fmtAed, offplanRatio, type AreaSummary } from '../../lib/marketData'

export function MarketMap({ areas, activeArea, onSelect }: { areas: AreaSummary[]; activeArea?: string; onSelect?: (area: string) => void }) {
  const { t } = useLang()
  const mapped = areas.filter((a) => AREA_COORDS[a.area_name])
  const maxTx = Math.max(1, ...mapped.map((a) => a.transaction_count ?? 0))

  return (
    <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
      <MapContainer
        center={[25.06, 55.25]}
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: 440, width: '100%', background: 'var(--surface-sunken)' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {mapped.map((a) => {
          const isActive = a.area_name === activeArea
          const r = 8 + (a.transaction_count / maxTx) * 22
          return (
            <CircleMarker
              key={a.area_name}
              center={AREA_COORDS[a.area_name]}
              radius={r}
              pathOptions={{
                color: isActive ? '#1b2a57' : '#cba45c',
                weight: isActive ? 3 : 1.5,
                fillColor: isActive ? '#1b2a57' : '#cba45c',
                fillOpacity: 0.55,
              }}
              eventHandlers={{ click: () => onSelect?.(a.area_name) }}
            >
              <Tooltip direction="top" offset={[0, -4]} opacity={1}>
                <div style={{ fontFamily: 'var(--font-body)', minWidth: 150 }}>
                  <div style={{ fontWeight: 800, fontSize: 13, color: '#1b2a57', marginBottom: 4 }}>{a.area_name}</div>
                  <div style={{ fontSize: 12, color: '#3f434d', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span>{t({ ko: '중위 거래가', en: 'Median' })}: <b>{fmtAed(a.median_value_aed)}</b></span>
                    <span>{t({ ko: '㎡당', en: 'Per m²' })}: <b>AED {a.price_per_sqm.toLocaleString()}</b></span>
                    <span>{t({ ko: '월 거래', en: 'Deals' })}: <b>{a.transaction_count.toLocaleString()}</b></span>
                    <span>{t({ ko: '분양', en: 'Off-plan' })}: <b>{offplanRatio(a)}%</b></span>
                  </div>
                </div>
              </Tooltip>
            </CircleMarker>
          )
        })}
      </MapContainer>
    </div>
  )
}
