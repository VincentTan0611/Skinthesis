import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/HomePage/Home";
import AuthPage from "./pages/User/AuthPage/AuthPage";
import useAuthStore from "../store/authStore";;
import Profile from "./pages/HomePage/Profile";
import Appointment from './pages/User/Appointment'
import CommunityForum from "./pages/User/CommunityForum";
import Risk from "./pages/User/Risk";
import ReportHistory from "./pages/User/ReportHistory";
import SelectRole from "./pages/User/AuthPage/SelectRole";
import UploadImage from "./pages/User/UploadImage";
import Article1 from "./pages/HomePage/Article1";
import Article2 from "./pages/HomePage/Article2";
import Article3 from "./pages/HomePage/Article3";
import Article4 from "./pages/HomePage/Article4";
import Article5 from "./pages/HomePage/Article5";
import ResultPage from "./pages/User/ResultPage";
import AuthPage1 from "./pages/Dermatologist/AuthPage/AuthPage1";
import AuthPage2 from "./pages/Admin/AuthPage/AuthPage2";
import ChatBot from "./pages/User/ChatBot";
import DermSignup from "./components/DermSignup";
import PatientList from "./pages/Dermatologist/PatientList";
import PatientDetail from "./pages/Dermatologist/PatientDetail";
import AdminDashboard from "./pages/Admin/AuthPage/AdminDashboard";
import SkinHealthTracker from "./pages/User/SkinHealthTracker";
import AdminSignup from "./components/AdminSignup";
import AdminPatientList from "./pages/Admin/AdminPatientList";
import AdminPatientDetail from "./pages/Admin/AdminPatientDetail";
import DermatologistList from "./pages/Admin/DermatologistList";
import DermatologistDetail from "./pages/Admin/DermatologistDetail";
import MyPosts from "./components/MyPosts";
import ConsentPage from "./pages/HomePage/ConsentPage";

const App = () => {

    const authUser = useAuthStore((state) => state.user);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/role" element={<SelectRole />} />
                <Route path="/risk" element={<Risk />} />
                <Route path="/appointment" element={<Appointment />} />
                <Route path="/community" element={<CommunityForum />} />
                <Route path="/risk" element={<Risk />} />
                <Route path="/result" element={<ResultPage/>} />
                <Route path="/upload" element={<UploadImage />} />
                <Route path="/art1" element={<Article1 />} />
                <Route path="/art2" element={<Article2 />} />
                <Route path="/art3" element={<Article3 />} />
                <Route path="/art4" element={<Article4 />} />
                <Route path="/art5" element={<Article5 />} />
                <Route path="/authpage" element= {!authUser? <AuthPage/ > : <Navigate to= "/"/>}/>
                <Route path="/authpagederma" element= {!authUser? <AuthPage1/ > : <Navigate to= "/"/>}/>
                <Route path="/admin" element= {!authUser? <AuthPage2/ > : <Navigate to= "/"/>}/>
                <Route path="/profile" element={<Profile />} />
                <Route path="/chat" element={<ChatBot />} />
                <Route path="/report" element={<ReportHistory />} />
                <Route path="/dermasignup" element={<DermSignup />} />
                <Route path="/adminsignup" element={<AdminSignup />} />
                <Route path="/patientlist" element={<PatientList />} />
                <Route path="/dermatologist/patients/:id" element={<PatientDetail />} />
                <Route path="/patientdetail" element={<PatientDetail />} />
                <Route path="/tracker" element={<SkinHealthTracker />} />
                <Route path="/admindashboard" element={<AdminDashboard />} />
                <Route path="/patients" element={<AdminPatientList />} />
                <Route path="/admin/patient/:id" element={<AdminPatientDetail />} />
                <Route path="/admin/dermatologists" element={<DermatologistList />} />
                <Route path="/admin/dermatologist/:id" element={<DermatologistDetail />} />
                <Route path="/myposts" element={<MyPosts />} />
                <Route path="/consent" element={<ConsentPage />} />
            </Routes>
        </Router>
    );
};

export default App;
