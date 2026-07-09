// Футер вітрини: лого + копірайт + правовий рядок (IP-стейтмент).
// БЕЗ соцмереж, БЕЗ privacy, без CMS/Payload — тексти зашиті англійською.
const LOGO_EN = '/img/Logo-kolir.svg'

export default function ShowcaseFooter() {
  return (
    <footer className="footerk" aria-label="Footer">
      <div className="footerk-shell">
        <div className="footerk-top">
          <div className="footerk-left">
            <span className="footerk-logo-link" aria-label="Kolir">
              <img className="footerk-logo" src={LOGO_EN} alt="Kolir" />
            </span>
            <div className="footerk-copy">© 2026 Kolir Agency. All rights reserved.</div>
          </div>
        </div>

        <div className="footerk-hr" />

        <div className="footerk-mid">
          <div className="footerk-legal">
            <div className="footerk-copy">
              All designs, texts and visual materials are the intellectual property of the company.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
