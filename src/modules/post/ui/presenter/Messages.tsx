import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import { v4 as uuidv4 } from 'uuid';
import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
    dialogBox: {
        backgroundColor: '#D3D3D3',
    },
    record: {
        border: '1px black solid',
        backgroundColor: '#F5DEB3',
    },
}));

function Messages(props: any) {
    const { activePostMessages } = props;
    const classes = useStyles();

    return (
        <Table>
            {activePostMessages.map((elem: string) => (
                <TableRow className={classes.record} key={uuidv4()}>
                    <div>
                        <span className={classes.dialogBox}>{elem}</span>
                    </div>
                </TableRow>
            ))}
        </Table>
    );
}

export default React.memo(Messages);
