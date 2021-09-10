import React from 'react';
import ReactDOM from 'react-dom';

import {Session} from '@ftrack/api'
import ftrackWidget from 'ftrack-web-widget'

import './index.css';
import App from './App';

export let session = null

function onWidgetLoad() {
    const credentials = ftrackWidget.getCredentials()
    session = new Session(credentials.serverUrl, credentials.apiUser, credentials.apiKey, {autoConnectEventHub: true})

    session.initializing.then(() => {
        ReactDOM.render(
            <App/>,
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
