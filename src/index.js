import React from 'react';
import ReactDOM from 'react-dom';

import {Session} from '@ftrack/api'
import ftrackWidget from 'ftrack-web-widget'

import {SessionProvider} from "./session_context";
import './index.css';
import App from './App';

function onWidgetLoad() {
    const credentials = ftrackWidget.getCredentials()
    const session = new Session(credentials.serverUrl, credentials.apiUser, credentials.apiKey)

    session.initializing.then(() => {
        ReactDOM.render(
            <SessionProvider value={session}>
                <App/>
            </SessionProvider>,
            document.getElementById('root')
        )
    })
}

function onDomContentLoaded() {
    ftrackWidget.initialize({
        onWidgetLoad
    })
}

window.addEventListener('DOMContentLoaded', onDomContentLoaded)
