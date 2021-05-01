import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    job: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid gray'
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%'
    },
    jobTitle: {
        fontSize: '1rem',
        fontWeight: 'bold',
        color: 'rgb(20, 20, 140)',
    },
    jobCompanyType: {

    },
    jobCompany: {
        color: 'rgb(170, 170, 170)'
    },
    jobType: {
        color: 'rgb(40, 200, 70)',
        fontWeight: 'bold',
    },
    alignRight: {
        textAlign: 'right'
    }
}));

export default function Job({ job }) {
    const classes = useStyles();

    return (
        <Link to={'/job/' + job.id} style={{ textDecoration: 'none', color: 'rgb(80,80,80)' }}>
            <div className={classes.job}>
                <div className={classes.box}>
                    <div className={classes.jobTitle}>
                        <p>{job.title}</p>
                    </div>
                    <div className={classes.jobCompanyType}>
                        <p>
                            <span className={classes.jobCompany}>{job.company}</span> - <span className={classes.jobType}>{job.type}</span>
                        </p>
                    </div>
                </div>
                <div className={classes.box}>
                    <p className={classes.alignRight}>{job.location}</p>
                    <p className={classes.alignRight}>{job.created_at}</p>
                </div>
            </div>
        </Link>
    )
}