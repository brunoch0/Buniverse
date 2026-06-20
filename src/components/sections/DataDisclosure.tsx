import { useLang } from '../../i18n/LanguageContext'

export interface Disclosure {
  sourceName: string
  sourceUrl?: string
  asOfDate: string // YYYY-MM-DD
}

/**
 * Source / as-of date / disclaimer caption — required on every market-data
 * module per spec (출처·기준일·면책). Renders a single-line caption.
 */
export function DataDisclosure({ source, level = 'standard' }: { source: Disclosure; level?: 'standard' | 'ai' }) {
  const { t } = useLang()
  return (
    <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.5, color: 'var(--text-muted)' }}>
      {t({ ko: '출처', en: 'Source' })}:{' '}
      {source.sourceUrl ? (
        <a href={source.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-link)' }}>
          {source.sourceName}
        </a>
      ) : (
        source.sourceName
      )}{' '}
      · {t({ ko: '기준일', en: 'As of' })} {source.asOfDate} ·{' '}
      {level === 'ai'
        ? t({ ko: 'AI 추정치, 참고용(투자 조언 아님)', en: 'AI estimate, for reference only (not investment advice)' })
        : t({ ko: '참고용(투자 조언 아님)', en: 'For reference only (not investment advice)' })}
    </p>
  )
}
