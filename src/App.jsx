import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import RootLayout from "./RootLayout"
import Home from "./pages/Home"
import { Provider } from "react-redux"
import store from './redux/store'
import AddNewItem from "./pages/AddNewItem"
import Todo from "./components/todo"
import NotFoundPage from "./pages/NotFoundPage"


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element = {<RootLayout />}>
            <Route index element = {<Home />} />

            <Route path="/cetagories/:category" element = {<Home />} />
           
            <Route path="/addItem" element = {<AddNewItem />} />
            <Route path="/edit/:editId" element = {<AddNewItem />} />
            <Route path="/todo" element = {<Todo />} />

        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </>
    )
  )
  return (
   <>
   <Provider store={store}>
      <RouterProvider router={router} />
   </Provider>
   </>
  )
}

export default App
