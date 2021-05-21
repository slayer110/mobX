import React from 'react';
import {useStore} from '../store/use-store'

export function OrganizationView(props) {
    const {organization, orgId} = props;
    const {questionStore} = useStore();
    const organizationStyle = {border: '1px grey solid', height: '50px', borderRadius: '10px'};
    return <div onClick={()=>questionStore.loadQuestion(orgId)} style={organizationStyle}>{organization}</div>
};

