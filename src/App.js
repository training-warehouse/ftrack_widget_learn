import React from 'react'

import ftrackWidget from 'ftrack-web-widget'
import {Event as FtrackEvent} from '@ftrack/api'

import {session} from "./index";
import './App.css'

function displayProjectInfo(id) {
    ftrackWidget.openSidebar('Project', id)
}

// 用tgetQueryVariable去解析action传过来的id，
//  然后再把id传回去，在后端再通过id去匹配之前的存到 entities_by_id 里面的所选择的对象
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            variable: {}
        }
    }

    componentDidMount() {
        session.query('select name from Project').then(res => {
            this.setState({projects: res.data})
        })
        this.setState({variable: this.getQueryVariable()})
    }


    onSend = () => {
        console.log(this.state.variable)
        const event = new FtrackEvent('ftrack.action.launch',
            {
                actionIdentifier: this.state.variable.identifier,
                values: this.state.variable
            }
        );
        return session.eventHub.publish(event)
    }

    getQueryVariable() {
        // 获取传过来的变量值
        let href = window.location.href
        let query = href.substring(href.indexOf('?') + 1);
        let vars = query.split("&");
        let obj = {}
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split("=");
            obj[pair[0]] = pair[1]
        }
        return obj;
    }

    render() {
        const {projects} = this.state

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
                            }}
                                key={project.id}>
                                {project.name}
                            </li>))}
                    </ul>
                    <button onClick={() => ftrackWidget.closeWidget()}>关闭
                    </button>
                    <button onClick={this.onSend}>发送</button>
                </main>
            </div>
        )
    }
}

export default App
