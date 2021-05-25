import React from 'react';
import {observer} from "mobx-react";
import {useStore} from "../store/use-store";
import {OrganizationView} from "./OrganizationView";
import ErrorComponent from "./common/ErrorView"
import LoadingComponent from "./common/LoadingView"

const QrganizationListView = observer(() => {
    const {organizationsStore} = useStore();
    const organizationsStyle = {
        width: '30%',
        height: '800px',
        border: '1px black solid',
        display: 'inline-block',
        overflowY: 'hidden'
    };

    const titleStyle={
        textAlign:'center',
    };

    return <div style={organizationsStyle}>
        <div style={titleStyle}><h1>Организации</h1></div>
        {organizationsStore.activeOrganizations.isLoading && <LoadingComponent/>}
        {organizationsStore.activeOrganizations.error && <ErrorComponent/>}

        <div>{organizationsStore.activeOrganizations.list.map((elem, i) => <OrganizationView
            key={i} orgId={i} organization={elem}/>)}
        </div>
    </div>

});

export default QrganizationListView;
