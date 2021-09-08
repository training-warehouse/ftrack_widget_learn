import React, {useEffect, useState} from 'react'

import ftrackWidget from 'ftrack-web-widget'

import useSession from "./session_context";
import './App.css'

function displayProjectInfo(id) {
    ftrackWidget.openSidebar('Project', id)
}


function App() {
    const [projects, setProjects] = useState([])
    const session = useSession()

    useEffect(() => {
        session.query('select name from Project').then(res => {
            setProjects(res.data)
        }, [session])
    })

    return (
        <div className="App">
            <header className='App-header'>
                {session.apiUser}
            </header>
            <main>
                <ul>
                    {projects.map(project => (
                        <li onClick={() => {
                            displayProjectInfo(project.id)
                        }}>
                            {project.name}
                        </li>))}
                </ul>
                <button onClick={() => ftrackWidget.closeWidget()}>关闭</button>
            </main>
        </div>
    )
}

export default App
