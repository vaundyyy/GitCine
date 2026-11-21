import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { AuthProvider } from "contexts/AuthContext";
import Listing from 'pages/Listing';
import Form from 'pages/Form';
import Navbar from "components/Navbar";
import Login from "pages/Login";
import Register from 'pages/Register';
import Profile from 'pages/Profile';
import SuggestMovie from 'pages/SuggestMovie';
import AdminDashboard from 'pages/AdminDashboard';
import PrivateRoute from "components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Listing />} />
          <Route path="/movies/:movieId/rate" element={<Form />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route 
            path="/profile" 
            element={
              <PrivateRoute blockAdmin>
                <Profile />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/suggest" 
            element={
              <PrivateRoute>
                <SuggestMovie/>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <PrivateRoute adminOnly>
                <AdminDashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;