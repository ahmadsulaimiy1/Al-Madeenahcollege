"use client";

import { PageShell } from "@/lib/PageShell";

const MAIN_HTML = `
<section class="hero">
  <svg class="plate" viewBox="0 0 600 600" fill="none" aria-hidden="true">
    <path d="M60 560 L60 300 Q60 140 300 90 Q540 140 540 300 L540 560" stroke="#D9BC7B" stroke-width="1.2"/>
    <path d="M120 560 L120 320 Q120 190 300 150 Q480 190 480 320 L480 560" stroke="#D9BC7B" stroke-width="1"/>
    <line x1="60" y1="560" x2="540" y2="560" stroke="#D9BC7B" stroke-width="1.2"/>
  </svg>
  <div class="wrap">
    <span class="eyebrow rv"><span class="type">اللغة العربية · القرآن الكريم · العلوم الإسلامية</span></span>
    <div class="rule rv rv-draw"></div>
    <h1 class="rv">تعليمٌ جادٌّ في اللغة العربية والعلوم الإسلامية، أينما كنت.</h1>
    <p class="hero__en rv">A serious education in Arabic and the Islamic sciences — wherever you are.</p>
    <p class="lead rv">صُمّمت كلية المدينة العالمية لطالبٍ يدرس من هاتفه، أو في استراحة عمله، أو
      باتصالٍ مستعار — لا لحرمٍ جامعي يُضاف إليه شاشة دخول. يُحدَّد التقدّم بإتقانٍ مُثبَتٍ أمام
      معلّمٍ مؤهَّل، لا بمرور التقويم.</p>
    <div class="ctas rv">
      <a class="btn btn--primary" href="/admissions/">ابدأ تقييم المستوى — مجانًا</a>
      <a class="btn btn--gilt" href="/admissions/">اطّلع على النموذج الأكاديمي</a>
    </div>
    <div class="status rv" id="status">
      <span class="dot" aria-hidden="true"></span>
      <p><strong>هذه مؤسسة في مرحلة التأسيس.</strong> لم يبدأ أي فوج دراسي بعد،
        ولا يُذكر هنا ما لا يمكن إثباته حاليًا.
        <a href="/admissions/">اقرأ بيان الشفافية ←</a></p>
    </div>
  </div>
</section>

<section class="section section--ivory">
  <div class="wrap">
    <div class="section-head rv">
      <span class="eyebrow">السلّم الأكاديمي</span>
      <h2>ثلاث كليات. معيارٌ واحد.</h2>
      <p class="lead section-head__lead">تُقيَّم كل كلية وفق معيار إتقانٍ منشور، وبالوتيرة التي
        يختارها الطالب — لا العكس.</p>
    </div>

    <div class="progrid">
      <article class="progrid__card rv">
        <span class="progrid__badge"><svg class="icon"><use href="#ic-book"/></svg></span>
        <h3>كلية اللغة العربية <span class="latin">Faculty of Arabic Language</span></h3>
        <p>تُدرَّس العربية بوصفها الأداة التي تفتح التراث — وتُقيَّم عبر القراءة والاستماع
          والحديث والكتابة وفهم النصوص الفصيحة، لا الطلاقة الحوارية وحدها.</p>
        <ul class="progrid__tags"><li>قراءة</li><li>استماع</li><li>حديث</li><li>كتابة</li><li>نصوص فصيحة</li></ul>
      </article>
      <article class="progrid__card rv">
        <span class="progrid__badge"><svg class="icon"><use href="#ic-scroll"/></svg></span>
        <h3>كلية القرآن <span class="latin">Faculty of Qur'an</span></h3>
        <p>النظر والتجويد والمخارج والتلاوة، ويُقاس الحفظ بـ<em>الثبات</em> — عبر اختبارٍ
          مفاجئ دوري، لا بعدد الصفحات المقروءة ثم المنسيّة.</p>
        <ul class="progrid__tags"><li>تجويد</li><li>حفظ</li><li>مراجعة</li><li>تقييم التلاوة</li></ul>
      </article>
      <article class="progrid__card rv">
        <span class="progrid__badge"><svg class="icon"><use href="#ic-scale"/></svg></span>
        <h3>كلية العلوم الشرعية <span class="latin">Faculty of Islamic Sciences</span></h3>
        <p>العقيدة، والفقه من نصوصٍ معتمدة على مذهبٍ واحدٍ مُعلَن، والحديث، والسيرة، وأصول
          الفقه — مع تناول اختلاف المذاهب المعتبرة باحترامٍ لا بترجيح.</p>
        <ul class="progrid__tags"><li>عقيدة</li><li>فقه</li><li>حديث</li><li>سيرة</li></ul>
      </article>
    </div>
    <p class="progrid__foot rv"><svg class="icon" aria-hidden="true"><use href="#ic-brief"/></svg>
      <span>يقوم إلى جانب هذا السلّم الأكاديمي مسارٌ منفصل، أخفّ وزنًا بقصد: <strong>البرامج
      المهنية والتخصصية</strong> — تأهيل المعلّمين، والعربية المهنية والتجارية، والبرامج
      المكثّفة الموسمية — حتى لا يُخلَط بينه وبين ثلاث سنواتٍ من الدراسة الأساسية.</span></p>
  </div>
</section>
`;

export default function ArHomeClient() {
  return <PageShell locale="ar" current="home" mainHtml={MAIN_HTML} />;
}
