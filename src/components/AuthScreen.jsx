import "../styles/auth.css";

export default function AuthScreen() {
  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Mirage Casino</h1>
        <p>Sign in to play Blackjack, Slots, and more.</p>

        <button className="game-button auth-google-btn" onClick={handleGoogleLogin}>
          Continue with Google
        </button>

        {/* You can add other providers later */}
        {/* <button className="game-button">Continue with GitHub</button> */}
      </div>
    </div>
  );
}
