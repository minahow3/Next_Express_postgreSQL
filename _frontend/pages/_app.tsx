import '@/styles/globals.css'
import { Noto_Sans_JP, Roboto } from 'next/font/google'
import { LanguageProvider } from '@/components/LanguageProvider'

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] })
const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] })

export const metadata = {
  title: '旅行計画アプリ',
  description: '旅行の計画を簡単に作成できるアプリケーション',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.className} ${roboto.className} bg-gray-50`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}

