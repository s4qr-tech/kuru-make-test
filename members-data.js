// 仲間ページのデータ（ここだけ書き換えれば、人の追加・差し替えができます）
// ・consent  : 掲載許可。true の人だけ表示（仮置きのため全員 true にしてある。本番では本人の許可を確認してから）
// ・photo    : 写真ファイルのパス（assets/members/ に入れる）。空なら「提出待ち」の枠を表示
// ・kari     : true のあいだ、名前の横に【仮】を表示（本人確認・掲載確定したら false か、この行を消す）
// ・photoOK  : 学生だけに使う。写真の掲載を本人が希望したとき true（false なら、イニシャルのアイコンで表示）
// ・理事・監事・顧問は「顔写真」と「プロフィール」が必須（空のままだと「提出待ち」の表示が出る）
window.KM_MEMBERS = {
  directors: [
    { consent:true, kari:true, name:'山本 みなみ', kana:'やまもと みなみ', role:'代表理事', en:'Representative Director',
      affil:'【仮・要確認】順天堂大学 ほか',
      photo:'',
      duties:['団体の代表として、活動方針の決定と対外的な窓口を担う','和アートセラピーの研究と、論文の執筆・研究発表'],
      bio:[],
      msg:'上手さよりも「その人らしさ」を大切にしながら、世代のあいだに会話が生まれる場所を、町のなかに増やしていきたいと考えています。【仮】' },
    { consent:true, kari:true, name:'ジョン・スミス', kana:'じょん・すみす', role:'理事', en:'Director',
      affil:'【仮・所属・肩書】',
      photo:'',
      duties:['法人運営に必要な業務全般（総務・事務局の運営）','理事会・総会の運営と、議事録・各種書類の管理','所轄庁への届出、規程・ルールの整備'],
      bio:['【仮】略歴を、3〜4行で記入。'],
      msg:'【仮】和アートセラピーへの想いを、2〜3行で記入。' },
    { consent:true, kari:true, name:'アレクサンダー・ジョンソン', kana:'あれくさんだー・じょんそん', role:'理事', en:'Director',
      affil:'【仮・所属・肩書】',
      photo:'',
      duties:['営業：協力施設・連携先・ご支援（会員・寄付）の開拓','企画：ワークショップ・イベントの立案','会計：収支の管理、予算・決算、会計報告の作成'],
      bio:['【仮】略歴を、3〜4行で記入。'],
      msg:'【仮】和アートセラピーへの想いを、2〜3行で記入。' }
  ],
  auditors: [
    { consent:true, kari:true, name:'◯◯ ◯◯【仮】', kana:'', role:'監事', en:'Auditor',
      affil:'【仮・所属・肩書】（監事は、理事・事業を独立した立場で確認する役割です）',
      photo:'',
      bio:['【仮】略歴を、3〜4行で記入。'],
      msg:'【仮】和アートセラピーへの想いを、2〜3行で記入。' }
  ],
  advisors: [
    { consent:true, kari:true, name:'M教授', kana:'', role:'顧問', en:'Advisor',
      affil:'【仮・大学名・学部】（氏名は、掲載許可を得てから表記します）',
      photo:'',
      bio:['【仮】専門分野・研究テーマを、3〜4行で記入。'],
      msg:'【仮】活動への助言・想いを、2〜3行で記入。' },
    { consent:true, kari:true, name:'Y教授', kana:'', role:'顧問', en:'Advisor',
      affil:'【仮・大学名・学部】（氏名は、掲載許可を得てから表記します）',
      photo:'',
      bio:['【仮】専門分野・研究テーマを、3〜4行で記入。'],
      msg:'【仮】活動への助言・想いを、2〜3行で記入。' }
  ],
  facilities: [
    { consent:true, kari:true, name:'A施設【仮・施設名】', kind:'特別養護老人ホーム', area:'【仮】◯◯市', since:'2025年度〜',
      note:'ロビーで作品展を開催してくださっています。【仮】', photo:'' },
    { consent:true, kari:true, name:'B施設【仮・施設名】', kind:'グループホーム', area:'【仮】◯◯市', since:'2026年〜',
      note:'七夕飾りを、利用者さんと一緒につくりました。【仮】', photo:'' },
    { consent:true, kari:true, name:'大阪のデイサービス施設【仮・施設名】', kind:'デイサービス', area:'大阪府', since:'2026年〜',
      note:'ハロウィンイベントを一緒に開催しました。【仮】', photo:'' }
  ],
  students: [
    { consent:true, kari:true, name:'K・T', univ:'【仮】順天堂大学 ◯年', focus:'施設訪問', word:'ちぎるたびに、話が弾むのが好きです。【仮】', photoOK:false, photo:'' },
    { consent:true, kari:true, name:'M・T', univ:'【仮】順天堂大学 ◯年', focus:'企画・準備', word:'【仮】ひとこと（任意）', photoOK:false, photo:'' },
    { consent:true, kari:true, name:'A・S', univ:'【仮】他大学 ◯年', focus:'デザイン・制作', word:'【仮】ひとこと（任意）', photoOK:false, photo:'' },
    { consent:true, kari:true, name:'R・H', univ:'【仮】他大学 ◯年', focus:'研究・記録', word:'【仮】ひとこと（任意）', photoOK:false, photo:'' },
    { consent:true, kari:true, name:'N・Y', univ:'【仮】順天堂大学 ◯年', focus:'広報', word:'【仮】ひとこと（任意）', photoOK:false, photo:'' }
  ]
};
