export default function Page() {
  return (
    <main className="wrap" style={{paddingBlock:64}}>
      <h1>Admissions</h1>
      <p style={{color:"var(--ink-soft)",maxWidth:"60ch",marginTop:16}}>Applications are open for learners aged 16 and over. The College is in its founding phase; no cohort has yet begun. Registration for under-16s awaits a named Safeguarding Lead.</p>
      <a className="btn" style={{marginTop:24,display:"inline-flex"}} href="/register/">Register — ages 16+</a>
    </main>
  );
}
