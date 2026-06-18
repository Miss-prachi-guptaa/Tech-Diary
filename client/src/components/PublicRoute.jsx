const PublicRoute = () => {
  const token = localStorage.getItem("accessToken");

  return token ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
