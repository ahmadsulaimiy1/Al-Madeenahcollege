export default function Page() {
  return (
    <main className="wrap" style={{paddingBlock:64}}>
      <h1 style={{fontSize:"2.6rem"}}>A serious education in Arabic and the Islamic sciences.</h1>
      <p style={{color:"var(--ink-soft)",maxWidth:"60ch",fontSize:"1.15rem",marginTop:20}}>Al-Madeenah is a founding-phase distance-learning college. Registration is open now for applicants 16 and over.</p>
      <div style={{display:"flex",gap:16,marginTop:32}}>
        <a className="btn" href="/register/">Register now</a>
        <a className="btn btn--gilt" href="/admissions/">Read admissions</a>
      </div>
    </main>
  );
}
