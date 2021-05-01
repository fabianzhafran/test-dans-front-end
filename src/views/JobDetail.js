import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';

import { useParams } from 'react-router-dom';
import axios from 'axios';
import { url } from '../utils/Const';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolBar: {
        backgroundColor: 'rgb(40, 40, 160)'
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    typeAndLocation: {
        color: 'rgb(170, 170, 170)'
    },
    jobTitle: {
        fontWeight: 'bold',
        fontSize: '2rem',
        borderBottom: '1px solid rgb(220, 220, 220)',
        margin: '0',
        padding: '2rem 0'
    },

    jobDetailContainer: {
        margin: '4vh 4vw',
        padding: '2vh 2vw',
        borderRadius: '10px'
    },
    jobDetail: {
        padding: '1vh 1vw',
        margin: '3vh 0',
        boxShadow: '0px 10px 50px -7px rgba(0,0,0,0.37)',
    },

    content: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '2rem'
    },
    article: {
        width: '70%'
    },
    sideArticle: {
        width: '30%',
        padding: '0 0 0 2rem'
    },
    imageContainer: {
        border: '10px solid rgb(240, 240, 240)',
        padding: '0 1rem 1rem 1rem',
        borderRadius: '10px',
        margin: '1rem 0'
    },
    companyName: {
        borderBottom: '1px solid rgb(100, 100, 100)',
        fontWeight: 'bold',
        fontSize: '1.2rem',
    },
    image: {
        maxWidth: '100%',
        margin: '1rem 0'
    },
    innerImageContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    companyUrl: {
        textDecoration: 'none',
        fontWeight: 'bold',
        color: 'rgb(20, 20, 140)',
    },
    howToApply: {
        border: '10px solid rgb(240, 240, 240)',
        padding: '0 1rem 1rem 1rem',
        borderRadius: '10px',
        margin: '1rem 0',
        backgroundColor: 'rgb(250, 250, 200)'
    },
    howToApplyTitle: {
        borderBottom: '1px solid rgb(200, 200, 200)',
        fontWeight: 'bold',
        color: 'rgb(100, 100, 100)',
        overflow: 'hidden'
    },
    skeletonText: {

    },
    howToApplyContent: {
        wordWrap: 'break-word'
    }
}));

export default function JobDetail() {
    let { id } = useParams();
    const [jobDetail, setJobDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    const classes = useStyles();

    useEffect(() => {
        async function fetchData() {
            let detail = await axios.get(url.detail + `${id}`);
            setJobDetail(detail.data);
            console.log(detail.data);
            setLoading(false);
        }
        try {
            fetchData();
        } catch (e) {

        }
    }, []);
    
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolBar} >
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Job List
                    </Typography>
                </Toolbar>
            </AppBar>

            <div className={classes.jobDetailContainer}>
                <Link to={'/'} style={{ textDecoration: 'none', color: 'rgb(180,180,180)', fontWeight: 'bold' }}>
                    <Button variant="contained" color="primary">
                        Go Back
                    </Button>               
                </Link>

                <div className={classes.jobDetail}>
                    { 
                        !loading ? 
                            <div>
                                <div className={classes.title}>
                                    <p className={classes.typeAndLocation}> <span>{jobDetail.type}</span> / <span>{jobDetail.location}</span> </p>
                                    <p className={classes.jobTitle}> {jobDetail.title} </p>
                                </div>

                                <div className={classes.content}>
                                    <div className={classes.article} dangerouslySetInnerHTML={{ __html: jobDetail.description }}/>
                                    <div className={classes.sideArticle}>
                                        <div className={classes.imageContainer}>
                                            <p className={classes.companyName}>{jobDetail.company}</p>
                                            <div className={classes.innerImageContainer}>
                                                <img className={classes.image} src={jobDetail.company_logo} />
                                            </div>
                                            <p>
                                                <a href={jobDetail.company_url} className={classes.companyUrl}>Company Website</a>
                                            </p>
                                        </div>
                                        <div className={classes.howToApply}>
                                            <p className={classes.howToApplyTitle}>How To Apply</p>
                                            <p className={classes.howToApplyContent} dangerouslySetInnerHTML={{ __html: jobDetail.how_to_apply }}></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        : 
                        <div>
                            <div className={classes.title}>
                                <p className={classes.typeAndLocation}> <Skeleton width={200} /> </p>
                                <p className={classes.jobTitle}> <Skeleton width={300} /> </p>
                            </div>

                            <div className={classes.content}>
                                <div className={classes.article}>
                                    {
                                        [...Array(10).keys()].map(e => {
                                            return <Skeleton className={classes.skeleton} width={Math.random() * 1000} />
                                        })
                                    }
                                </div>
                                <div className={classes.sideArticle}>
                                    <Skeleton />
                                </div>
                            </div>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}