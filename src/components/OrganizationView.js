import React from 'react';
import {useStore} from '../store/use-store'
import {observer} from "mobx-react";

export const OrganizationView=observer((props)=> {
    const {organization, orgId} = props;
    const {organizationsStore: {selectOrg, activeOrgId}} = useStore();
    const organizationStyle = {border: '1px grey solid', height: '50px', borderRadius: '10px'};

    return <div onClick={() => selectOrg(orgId)} style={{
        ...organizationStyle,
        backgroundColor: `${activeOrgId === orgId ? 'grey' : 'white'}`
    }}>{organization}
    </div>
});

