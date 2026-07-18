import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { BrowserRouter, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AllPost from './pages/AllPost.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
const router = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
      {
        path:"",
        element:<Home />
      },
      {
        path:"/login",
        element:(
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path:"/signup",
        element:(
          <AuthLayout authentication={false} >
            <Signup />
          </AuthLayout>
        )
      },
      {
        path:"all-posts",
        element:(
          <AuthLayout authentication={true}>
            <AllPost />
          </AuthLayout>
        )
      },
      {
        path:"add-post",
        element:(
          <AuthLayout authentication={true}>
            <AddPost />
          </AuthLayout>
        )
      },
      {
        path:"/edit-post/:slug",
        element:(
          <AuthLayout authentication ={true}>
            <EditPost />
          </AuthLayout>
        )
      },
      {
        path:"/post/:slug",
        element:<Post/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
   </BrowserRouter>
  </StrictMode>,
)
