export default function LoginPage() {
  return (
    <main className="pageShell">
      <a className="backLink" href="/">← Back to Home</a>
      <section className="formCard narrow">
        <p className="eyebrow">Customer Login</p>
        <h1>Access your Shop2GY portal.</h1>
        <form className="form">
          <label>Email<input type="email" placeholder="you@email.com" /></label>
          <label>Password<input type="password" placeholder="Password" /></label>
          <a className="primary full linkButton" href="/dashboard">Login Demo</a>
        </form>
        <p className="smallText">Full authentication will connect to Supabase in the next step.</p>
      </section>
    </main>
  );
}
