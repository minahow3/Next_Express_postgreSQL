import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TorusIcon as Torii, MapPin, Calendar, Users, Star } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <header className="bg-white shadow-sm border-b border-stone-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-indigo-700 flex items-center">
            <Torii className="w-8 h-8 mr-2" />
            旅のしおり
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="#features" className="text-gray-600 hover:text-indigo-600">
                  機能
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-gray-600 hover:text-indigo-600">
                  使い方
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-gray-600 hover:text-indigo-600">
                  お客様の声
                </Link>
              </li>
              <li>
                <Button variant="outline">ログイン</Button>
              </li>
              <li>
                <Button>新規登録</Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-[url('/images/japanese-landscape.jpg')] bg-cover bg-center py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4 text-shadow">日本の旅をもっと楽しく、スムーズに</h1>
            <p className="text-xl mb-8 text-shadow">旅のしおりで簡単に旅程を作成、共有、管理できます</p>
            <Button size="lg" className="text-lg px-8 py-4 bg-red-600 hover:bg-red-700">
              無料で始める
            </Button>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">旅のしおりの特徴</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white border-indigo-100 shadow-md">
                <CardHeader>
                  <MapPin className="w-10 h-10 text-indigo-500 mb-2" />
                  <CardTitle>日本の名所を網羅</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>全国の観光地、隠れた名所、人気スポットを豊富に収録。あなたの旅をサポートします。</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-indigo-100 shadow-md">
                <CardHeader>
                  <Calendar className="w-10 h-10 text-indigo-500 mb-2" />
                  <CardTitle>季節に合わせた提案</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>桜、紅葉、雪景色など、日本の四季に合わせた旅行プランを提案します。</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-indigo-100 shadow-md">
                <CardHeader>
                  <Users className="w-10 h-10 text-indigo-500 mb-2" />
                  <CardTitle>グループ機能</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>家族や友人と旅行プランを共有し、みんなで楽しく旅の準備ができます。</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-indigo-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">使い方</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border-2 border-indigo-200">
                  <span className="text-2xl font-bold text-indigo-600">1</span>
                </div>
                <h3 className="font-semibold mb-2">アカウント作成</h3>
                <p>メールアドレスで簡単登録</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border-2 border-indigo-200">
                  <span className="text-2xl font-bold text-indigo-600">2</span>
                </div>
                <h3 className="font-semibold mb-2">旅行プラン作成</h3>
                <p>目的地、日程、予算を入力</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border-2 border-indigo-200">
                  <span className="text-2xl font-bold text-indigo-600">3</span>
                </div>
                <h3 className="font-semibold mb-2">スポット追加</h3>
                <p>行きたい場所や予約情報を追加</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border-2 border-indigo-200">
                  <span className="text-2xl font-bold text-indigo-600">4</span>
                </div>
                <h3 className="font-semibold mb-2">しおり完成</h3>
                <p>PDFでダウンロードや共有が可能</p>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">お客様の声</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white border-indigo-100 shadow-md">
                <CardHeader>
                  <CardTitle>京都旅行が楽しくなりました</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    寺社仏閣の情報が充実していて、効率的に回れました。季節のおすすめスポットも教えてくれて助かりました。
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  </div>
                </CardFooter>
              </Card>
              <Card className="bg-white border-indigo-100 shadow-md">
                <CardHeader>
                  <CardTitle>温泉旅行の計画に最適</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>全国の温泉地の情報が豊富で、宿の選び方や周辺観光のプランニングがスムーズにできました。</p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  </div>
                </CardFooter>
              </Card>
              <Card className="bg-white border-indigo-100 shadow-md">
                <CardHeader>
                  <CardTitle>家族旅行の味方です</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    子供向けスポットの提案や、移動時間を考慮したプラン作成機能が便利でした。家族みんなで楽しめる旅ができました。
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-indigo-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">あなたの日本旅行をもっと素晴らしいものに</h2>
            <p className="text-xl mb-8">今すぐ登録して、旅のしおり作成を始めましょう</p>
            <div className="flex justify-center space-x-4">
              <Input type="email" placeholder="メールアドレス" className="w-64 bg-white text-black" />
              <Button variant="secondary" size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                無料で始める
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-stone-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Torii className="w-6 h-6 mr-2" />
                旅のしおり
              </h3>
              <p>日本の旅をもっと楽しく、スムーズに</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">リンク</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-indigo-400">
                    ホーム
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-indigo-400">
                    機能
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-indigo-400">
                    料金プラン
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-indigo-400">
                    お問い合わせ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">法的情報</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-indigo-400">
                    利用規約
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-indigo-400">
                    プライバシーポリシー
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-indigo-400">
                    特定商取引法に基づく表記
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">フォローする</h4>
              <div className="flex space-x-4">
                <Link href="#" className="hover:text-indigo-400">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="hover:text-indigo-400">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06s-3.056-.012-4.123-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

