"use client";

import { PageShell } from "@/lib/PageShell";

const EXTRA_CSS = `
.regwrap{max-width:760px;margin-inline:auto}
.regcard{position:relative;overflow:hidden;padding:40px 40px 44px;background:linear-gradient(165deg,var(--ivory) 0%,var(--cream) 100%);
  border:1px solid rgba(184,147,61,.22);border-radius:var(--r-card);box-shadow:var(--sh)}
@media (max-width:640px){ .regcard{padding:28px 22px 32px} }
.regfield{display:flex;flex-direction:column;gap:8px;margin-bottom:22px}
.regfield label{font-family:var(--f-ui);font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;
  font-weight:700;color:var(--blue-800)}
.regfield__hint{font-size:.8125rem;color:var(--ink-faint);margin-top:-2px}
.reginput,.regselect{font-family:var(--f-ui);font-size:1rem;padding:13px 16px;border-radius:10px;
  border:1.5px solid var(--hairline);background:var(--ivory);color:var(--ink);width:100%;
  transition:border-color .2s,box-shadow .2s}
.reginput:focus,.regselect:focus{outline:none;border-color:var(--gold);box-shadow:0 0 0 3px rgba(184,147,61,.18)}
.regrow{display:grid;grid-template-columns:1fr 1fr;gap:20px}
@media (max-width:560px){ .regrow{grid-template-columns:1fr} }
.regpaces{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
@media (max-width:640px){ .regpaces{grid-template-columns:1fr 1fr} }
.regpace{position:relative}
.regpace input{position:absolute;opacity:0;inset:0;cursor:pointer;margin:0}
.regpace span{display:block;text-align:center;padding:14px 8px;border-radius:12px;border:1.5px solid var(--hairline);
  background:var(--ivory);font-size:.8125rem;font-weight:700;color:var(--ink-soft);transition:all .2s}
.regpace input:checked + span{border-color:var(--gold);background:linear-gradient(165deg,#fffdf7,var(--cream));
  color:var(--blue-800);box-shadow:0 0 0 1px rgba(184,147,61,.25)}
.regpace input:focus-visible + span{outline:2px solid var(--blue-700);outline-offset:2px}
.regcheck{display:flex;align-items:flex-start;gap:12px;font-size:.9375rem;color:var(--ink-soft);line-height:1.5}
.regcheck input{margin-top:4px;flex-shrink:0;width:18px;height:18px;accent-color:var(--blue-700)}
.regcheck a{color:var(--blue-700);font-weight:700;text-decoration:underline}
.reg-agegate{display:none;margin-bottom:22px}
.reg-agegate.show{display:block}
.reg-error{display:none;margin-bottom:22px}
.reg-error.show{display:block}
.regsubmit{width:100%;justify-content:center;font-size:.875rem;padding:17px 32px}
.regsubmit:disabled{opacity:.55;cursor:not-allowed}
.regsuccess{display:none;text-align:center;padding:12px 6px}
.regsuccess.show{display:block}
.regsuccess__badge{width:72px;height:72px;border-radius:50%;margin:0 auto 20px;display:flex;align-items:center;
  justify-content:center;background:radial-gradient(circle at 35% 22%,#fffdf7,var(--cream) 78%);border:1.5px solid var(--gold)}
.regsuccess__badge .icon{width:32px;height:32px;color:var(--gold-ink)}
.regsuccess h2{font-size:1.6rem;margin-bottom:14px}
.regsuccess p{color:var(--ink-soft);max-width:52ch;margin:0 auto 14px;line-height:1.65}
.regsuccess ol{text-align:start;max-width:46ch;margin:24px auto 0;padding:0;list-style:none;counter-reset:rs}
.regsuccess ol li{counter-increment:rs;display:flex;gap:12px;padding:10px 0;color:var(--ink-soft);font-size:.9375rem}
.regsuccess ol li::before{content:counter(rs);flex-shrink:0;width:24px;height:24px;border-radius:50%;
  background:var(--cream);border:1.5px solid var(--gold);color:var(--blue-800);font-size:.75rem;font-weight:700;
  display:flex;align-items:center;justify-content:center}
.regform-body{display:block}
.regform-body.hide{display:none}
`;

const MAIN_HTML = `
<section class="section section--ivory" style="padding-top:calc(var(--sp-9) - 40px)">
  <div class="wrap regwrap">
    <div class="section-head rv" style="margin-bottom:var(--sp-6)">
      <span class="eyebrow">Register</span>
      <h2>Begin your application.</h2>
      <p class="lead section-head__lead">Registration is open now for students aged 16 and
        over. It takes a few minutes, and every field below is exactly what admissions uses to
        review your application — nothing is collected "just in case."</p>
    </div>

    <div class="regcard rv">
      <div id="reg-error" class="callout reg-error" role="alert">
        <span class="callout__k">Could not register</span>
        <p id="reg-error-text"></p>
      </div>

      <div id="reg-agegate" class="callout reg-agegate" role="status">
        <span class="callout__k">Registration for this age is not open yet</span>
        <p>Al-Madeenah accepts students from age 10, but registration for anyone under 16 is not
          open yet. The safeguarding structure the Academic &amp; Editorial Bible requires before
          any minor may be enrolled — a named Safeguarding Lead, a vetting standard, and a
          published recording &amp; retention policy — is not yet in place, and we will not skip
          it. This is a deliberate, published condition, not an oversight.</p>
        <p>Please see the <a href="/safeguarding/" style="color:var(--blue-700);font-weight:700;text-decoration:underline">safeguarding policy</a> for exactly what is missing. We will
          update this the moment it changes.</p>
      </div>

      <form id="reg-form" class="regform-body" novalidate>
        <div class="regfield">
          <label for="fullName">Full name</label>
          <input class="reginput" type="text" id="fullName" name="fullName" autocomplete="name" required minlength="2">
        </div>

        <div class="regrow">
          <div class="regfield">
            <label for="email">Email address</label>
            <input class="reginput" type="email" id="email" name="email" autocomplete="email" required>
          </div>
          <div class="regfield">
            <label for="password">Password</label>
            <input class="reginput" type="password" id="password" name="password" autocomplete="new-password" required minlength="8">
            <span class="regfield__hint">At least 8 characters. Stored as a bcrypt hash — never in plain text.</span>
          </div>
        </div>

        <div class="regrow">
          <div class="regfield">
            <label for="dateOfBirth">Date of birth</label>
            <input class="reginput" type="date" id="dateOfBirth" name="dateOfBirth" required>
          </div>
          <div class="regfield">
            <label for="country">Country of residence</label>
            <select class="regselect" id="country" name="country" required></select>
          </div>
        </div>

        <div class="regfield">
          <label>Preferred pace</label>
          <div class="regpaces">
            <label class="regpace"><input type="radio" name="preferredPace" value="Flexible"><span>Flexible</span></label>
            <label class="regpace"><input type="radio" name="preferredPace" value="Regular" checked><span>Regular</span></label>
            <label class="regpace"><input type="radio" name="preferredPace" value="Intensive"><span>Intensive</span></label>
            <label class="regpace"><input type="radio" name="preferredPace" value="Accelerated"><span>Accelerated</span></label>
          </div>
        </div>

        <div class="regfield">
          <label class="regcheck">
            <input type="checkbox" id="agreeTerms" name="agreeTerms" required>
            <span>I have read and agree to the <a href="/terms/" target="_blank">Terms of Service</a> and the
              <a href="/privacy/" target="_blank">Privacy Policy</a>.</span>
          </label>
        </div>

        <button type="submit" class="btn btn--primary regsubmit" id="reg-submit">Submit registration</button>
      </form>

      <div id="reg-success" class="regsuccess">
        <span class="regsuccess__badge"><svg class="icon" aria-hidden="true"><use href="#ic-check"/></svg></span>
        <h2>Your registration is recorded.</h2>
        <p id="reg-success-email-line">A confirmation has been sent to your email — it explains what happens next
          and has no attachments to open, nothing to click but a reply if you have a question.</p>
        <p>The College remains in its founding phase: no cohort has yet begun studying, and this
          is not an offer of a place. It is a genuine, individually-reviewed application.</p>
        <ol>
          <li>Your application enters review with admissions — every application receives a real answer, never a silent rejection.</li>
          <li>If accepted, you'll be told your place in the queue for the first intake.</li>
          <li>Before your first live class, a short, unhurried orientation to the Study.</li>
        </ol>
        <div class="ctas" style="justify-content:center;margin-top:28px">
          <a class="btn btn--gilt" href="/">Return home</a>
        </div>
      </div>
    </div>
  </div>
</section>
`;

const EXTRA_SCRIPT = `
(function(){
  var COUNTRIES = [
    "Nigeria","Ghana","Senegal","Côte d'Ivoire","Mali","Niger","Guinea","Sierra Leone","Liberia","The Gambia",
    "United Kingdom","Ireland","Germany","France","Netherlands","Belgium","Spain","Italy","Sweden","Norway",
    "Denmark","Finland","Switzerland","Austria","Portugal","Poland",
    "Saudi Arabia","United Arab Emirates","Qatar","Kuwait","Bahrain","Oman",
    "United States","Canada",
    "Egypt","Morocco","Algeria","Tunisia","Libya","Sudan","Kenya","South Africa","Tanzania","Uganda",
    "Pakistan","India","Bangladesh","Indonesia","Malaysia","Turkey","Jordan","Lebanon","Iraq",
    "Australia","New Zealand","Brazil","Other"
  ];
  var sel = document.getElementById('country');
  if (sel) {
    COUNTRIES.forEach(function(c){
      var o = document.createElement('option');
      o.value = c; o.textContent = c;
      sel.appendChild(o);
    });
  }

  var dobInput = document.getElementById('dateOfBirth');
  var agegate = document.getElementById('reg-agegate');
  var formBody = document.getElementById('reg-form');
  var submitBtn = document.getElementById('reg-submit');

  function age(dobStr){
    var d = new Date(dobStr + 'T00:00:00Z');
    if (isNaN(d.getTime())) return null;
    var now = new Date();
    var a = now.getUTCFullYear() - d.getUTCFullYear();
    var m = now.getUTCMonth() - d.getUTCMonth();
    if (m < 0 || (m === 0 && now.getUTCDate() < d.getUTCDate())) a--;
    return a;
  }

  function checkAge(){
    if (!dobInput.value) { agegate.classList.remove('show'); return true; }
    var a = age(dobInput.value);
    var under16 = a !== null && a < 16;
    agegate.classList.toggle('show', under16);
    if (submitBtn) submitBtn.disabled = under16;
    return !under16;
  }
  if (dobInput) {
    dobInput.addEventListener('change', checkAge);
    dobInput.addEventListener('blur', checkAge);
  }

  var errBox = document.getElementById('reg-error');
  var errText = document.getElementById('reg-error-text');
  function showError(msg){
    errText.textContent = msg;
    errBox.classList.add('show');
    errBox.scrollIntoView({behavior:'smooth', block:'center'});
  }
  function clearError(){ errBox.classList.remove('show'); }

  var form = document.getElementById('reg-form');
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      clearError();

      if (!checkAge()) {
        agegate.scrollIntoView({behavior:'smooth', block:'center'});
        return;
      }

      var data = {
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value,
        dateOfBirth: dobInput.value,
        country: document.getElementById('country').value,
        preferredPace: (form.querySelector('input[name="preferredPace"]:checked') || {}).value,
        agreeTerms: document.getElementById('agreeTerms').checked
      };

      if (!data.fullName || data.fullName.length < 2) { showError('Please enter your full name.'); return; }
      if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(data.email)) { showError('Please enter a valid email address.'); return; }
      if (!data.password || data.password.length < 8) { showError('Password must be at least 8 characters.'); return; }
      if (!data.country) { showError('Please select your country of residence.'); return; }
      if (!data.preferredPace) { showError('Please choose a preferred pace.'); return; }
      if (!data.agreeTerms) { showError('You must agree to the Terms and Privacy Policy to register.'); return; }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting…';

      fetch('/api/register', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
      }).then(function(res){
        return res.json().then(function(json){ return {status: res.status, json: json}; });
      }).then(function(r){
        if (r.status === 201 && r.json.ok) {
          document.getElementById('reg-form').classList.add('hide');
          var successEmailLine = document.getElementById('reg-success-email-line');
          if (r.json.emailSent === false) {
            successEmailLine.textContent = 'Your registration is saved. We were unable to send the confirmation email just now — admissions has still been notified directly, and you will hear from us at the email address you registered with.';
          }
          document.getElementById('reg-success').classList.add('show');
          document.getElementById('reg-success').scrollIntoView({behavior:'smooth', block:'start'});
        } else if (r.status === 403 && r.json.code === 'UNDER_16_NOT_OPEN') {
          agegate.classList.add('show');
          agegate.scrollIntoView({behavior:'smooth', block:'center'});
        } else {
          showError(r.json.error || ('Registration failed (status ' + r.status + ').'));
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit registration';
        }
      }).catch(function(){
        showError('A network error occurred. Please check your connection and try again.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit registration';
      });
    });
  }
})();
`;

export default function RegisterClient() {
  return (
    <PageShell
      locale="en"
      current="other"
      mainHtml={MAIN_HTML}
      extraCss={EXTRA_CSS}
      extraScript={EXTRA_SCRIPT}
    />
  );
}
