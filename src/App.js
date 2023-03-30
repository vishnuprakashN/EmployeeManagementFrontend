import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard/index";
import {Routes, Route} from "react-router-dom";
import "./index.css";
import Team from "./scenes/team/index";
import projectspage from "./scenes/projectspage/index";
import Projects from './scenes/projects/index';
import TeamsPage from './scenes/teamspage/index';
import Department from './scenes/department/index';
import Designation from './scenes/designation/index';
import Form from "./scenes/form/index";
import ProjectForm from './scenes/addproject/index';
import ProjectsPage from './scenes/projectspage/index';
import Analytics from './scenes/analytics/index';
import DepartmentsPage from './scenes/departmentspage/index';
import DesignationsPage from './scenes/designationspage/index';
import Jobs from './scenes/job/index';
import BarGraph from './scenes/bargraph/index';
import TimeSheets from './scenes/timesheet/index';
import TimeSheetForm from './scenes/addtimesheet/index';
import Calendar from "./scenes/calendar/index";
import Profile from './scenes/employee/profile';
import Profile2 from './scenes/employee/profile2';
import AddEmployee from './scenes/employee/addEmployee';
import UserProfilePage from './scenes/employee/userProfilePage';
import ProfileListView from './scenes/employee/profileListView';
import AddProject from './scenes/addproject/addProject';
import AddUsers from './scenes/projectspage/addUsers';
import AddTeam from './scenes/projects/addTeam';
import Recommendation from './scenes/projects/recommendation';
import FilteredEmployees from './scenes/projects/filteredEmployees';


function App() {
  const [theme,colorMode]= useMode();
  return (<ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div className='app'>
                <Sidebar/>
        <main className='content'>
          <Topbar/>
          <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/team" element={<Team/>}/>
          <Route path="/projectspage" element={<ProjectsPage/>}/>
          <Route path="/projects" element={<Projects/>}/> 
          <Route path="/form" element={<Form/>}/> 
          <Route path="/addproject" element={<AddProject/>}/> 
          <Route path="/teamspage" element={<TeamsPage/>}/> 
          <Route path="/department" element={<Department/>}/> 
          <Route path="/designation" element={<Designation/>}/> 
          <Route path="/analytics" element={<Analytics/>}/> 
          <Route path="/departmentspage" element={<DepartmentsPage/>}/> 
          <Route path="/designationspage" element={<DesignationsPage/>}/> 
          <Route path="/jobs" element={<Jobs/>}/> 
          <Route path="/bargraph" element={<BarGraph/>}/>
          <Route path="/timesheet" element={<TimeSheets/>}/>
          <Route path="/addtimesheet" element={<TimeSheetForm/>}/>
          <Route path="/calendar" element={<Calendar/>}/>
          <Route path="/employee" element = {<Profile2/>}/>
          <Route path="/employee/profilelistview" element = {<ProfileListView/>}/>
          <Route path="/addUsers" element={<AddUsers/>}></Route>
          <Route path="/addTeam" element={<AddTeam/>}></Route>
          <Route path="/recommendation" element={<Recommendation/>}></Route>
          <Route path="/filteredEmployees" element={<FilteredEmployees/>}></Route>
          </Routes>
        </main>
      </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
      );
}

export default App;
