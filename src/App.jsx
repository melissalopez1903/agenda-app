import { Routes, Route } from 'react-router-dom'

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Crud from "./pages/Crud";
import Users from "./pages/Users";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="crud" element={<Crud />} />
          <Route path="users/*" element={<Users />} />
          <Route path="search" element={<SearchResults />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

  )
}

export default App
