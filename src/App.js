import React, {useEffect, useState} from 'react'

import ftrackWidget from 'ftrack-web-widget'
import {Event as FtrackEvent} from '@ftrack/api'

import useSession from "./session_context";
import './App.css'

function displayProjectInfo(id) {
    ftrackWidget.openSidebar('Project', id)
}

// todo 改成类的形式 用this.props.match.match.params去解析action传过来的id，
//  然后再把id传回去，在后端再通过id去匹配之前的存到 entities_by_id 里面的所选择的对象
function App() {
    const [projects, setProjects] = useState([])
    const session = useSession()

    useEffect(() => {
        session.query('select name from Project').then(res => {
            setProjects(res.data)
        }, [session])
    })

    const onSend = () => {
        const event = new FtrackEvent('ftrack.action.launch',
            {actionIdentifier: 'nftrack.action.Test',entity_id:'aaaaaaaaaaaaaaaaaaaaaaa'}
            );
        return session.eventHub.publish(event)
    }

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
                <button onClick={onSend}>发送</button>
            </main>
        </div>
    )
}

export default App
