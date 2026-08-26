import { HashRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { ProtectedRoute, AdminRoute } from '@/components/ProtectedRoute';
import { LoginPage } from '@/pages/LoginPage';
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage';
import { HomePage } from '@/pages/HomePage';
import { DispositivosPage, CategoryPage } from '@/pages/DispositivosPage';
import { DeviceDetailPage } from '@/pages/DeviceDetailPage';
import { ManualesPage, ManualDetailPage } from '@/pages/ManualesPage';
import { RedesPage } from '@/pages/RedesPage';
import { SugerenciasPage } from '@/pages/SugerenciasPage';
import { InformePage } from '@/pages/InformePage';
import { ProcedimientosPage } from '@/pages/ProcedimientosPage';
import { IrreparablesPage } from '@/pages/IrreparablesPage';
import { AdminPage } from '@/pages/AdminPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { deviceCategories, type DeviceCategory } from '@/data/devices';

function CategoryPageWrapper() {
  const { category } = useParams();
  const valid = deviceCategories.find((c) => c.id === category);
  if (!valid) return <Navigate to="/dispositivos" replace />;
  return <CategoryPage category={category as DeviceCategory} />;
}

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/recuperar" element={<ForgotPasswordPage />} />
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/dispositivos" element={<DispositivosPage />} />
            <Route path="/dispositivos/:category" element={<CategoryPageWrapper />} />
            <Route path="/dispositivos/modelo/:id" element={<DeviceDetailPage />} />
            <Route path="/manuales" element={<ManualesPage />} />
            <Route path="/manuales/:id" element={<ManualDetailPage />} />
            <Route path="/redes" element={<RedesPage />} />
            <Route path="/sugerencias" element={<SugerenciasPage />} />
            <Route path="/procedimientos" element={<ProcedimientosPage />} />
            <Route path="/procedimientos/irreparables" element={<IrreparablesPage />} />
            <Route path="/informe" element={<InformePage />} />
            <Route path="/perfil" element={<ProfilePage />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPage />
                </AdminRoute>
              }
            />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
