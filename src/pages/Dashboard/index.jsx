import { Redirect } from "react-router";

const Dashboard = ({ auth }) => {
  if (!auth) {
    return <Redirect to="/login" />;
  }
  return <h1>Dash</h1>;
};

export default Dashboard;
