import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../../store/use-store';
import { OrganizationView } from '../../../components/OrganizationView';
import ErrorComponent from '../../../components/common/ErrorView';
import LoadingComponent from '../../../components/common/LoadingView';

const dialogBoxAreaStyle: any = {
    width: '100%',
    height: '80%',
    borderBottom: '2px black solid',
    display: 'inline-block',
    overflowY: 'hidden',
};

const correspondenceAreaStyle: any = {
    height: '100%',
    border: '1px black solid',
    display: 'flex',
    flexDirection: 'column',
    width: '30%'
};

const fieldForSendingMessageStyle: any = {
    height: '30%',
};

const titleStyle: any = {
    textAlign: 'center',
    border: '1px black solid',
};

const CorrespondenceAreaView = observer(() => {
    const { organizationsStore }: any = useStore();

    return (
        <div style={correspondenceAreaStyle}>
            <div style={titleStyle}>
                <h1>Окно переписки</h1>
            </div>
            {organizationsStore.activeOrganizations.isLoading && (
                <LoadingComponent />
            )}
            {organizationsStore.activeOrganizations.error && <ErrorComponent />}
            <div style={dialogBoxAreaStyle}>
                {organizationsStore.activeOrganizations.list.map(
                    (elem: any, i: number) => (
                        <OrganizationView
                            key={i}
                            orgId={i}
                            organization={elem}
                        />
                    )
                )}
            </div>
            <div style={fieldForSendingMessageStyle}></div>
        </div>
    );
});

export default CorrespondenceAreaView;
