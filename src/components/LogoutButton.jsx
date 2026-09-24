import { useAuth0 } from "@auth0/auth0-react";

export const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  if (!isAuthenticated) return null;
  return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Cerrar sesión
    </button>
  );
};
