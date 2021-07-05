import React from 'react';
import {useStore} from '../store/use-store';
import {observer} from 'mobx-react';

const organizationStyle: any = {
    border: '1px grey solid',
    height: '50px',
    borderRadius: '10px',
};

export const OrganizationView = observer((props: any) => {
    const {organization, orgId} = props;
    const {
        organizationsStore,
    }: any = useStore();

    return (
        <div
            onClick={() => organizationsStore.selectOrg(orgId)}
            style={{
                ...organizationStyle,
                backgroundColor: `${organizationsStore.activeOrgId === orgId ? 'grey' : 'white'}`,
            }}
        >
            {organization}
        </div>
    );
});
