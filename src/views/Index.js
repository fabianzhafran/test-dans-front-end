import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import { fade, makeStyles } from '@material-ui/core/styles';

import Skeleton from '@material-ui/lab/Skeleton';
import Pagination from '@material-ui/lab/Pagination';

import Cookies from 'universal-cookie';

import Job from './components/Job';

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
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchIcon: {
        padding: theme.spacing(1, 2),
        height: '100%',
        pointerEvents: 'none',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1.3, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    logoutButton: {
        marginLeft: '1rem'
    },
    jobList: {
        margin: '4vh 4vw',
        padding: '2vh 2vw',
        boxShadow: '0px 10px 50px -7px rgba(0,0,0,0.37)',
        borderRadius: '10px'
    },
    loadingSkeleton: {
        borderBottom: '1px solid gray',
        margin: '1vh 0',
        padding: '1vh 0'
    }
}));

export default function Index() {
    const classes = useStyles();
    const [jobList, setJobList] = useState(null);
    const [renderedJobList, setRenderedJobList] = useState(null);
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [fullTime, setFullTime] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(null);
    const pageSize = 7;

    useEffect(() => {
        async function fetchJobs() {
            let queryString = `?description=${description}&location=${location}&full_time=${fullTime}`
            let res = await axios.get(url.home + queryString);
            setJobList(res.data);
            setPage(0);
            setIsLoading(false);
            console.log(res.data);
        }
        try {
            fetchJobs();
        } catch (e) {
            //
        }
    }, []);

    useEffect(() => {
        if (jobList) {
            setRenderedJobList(jobList.slice(page * pageSize, page * pageSize + pageSize));
        }
    }, [page, jobList]);

    function renderJobList() {
        if (renderedJobList !== null) {
            if (renderedJobList.length > 0) {
                return renderedJobList.map(e => {
                    return <Job job={e} />
                })
            } else {
                return (
                    <p>Job list is empty</p>
                )
            }
        } else {
            return (
                <p>Job list is empty</p>
            )
        }
    }

    function renderLoading() {
        return [...Array(10).keys()].map(e => {
            return <Skeleton className={classes.loadingSkeleton}/>
        })
    }

    async function handleFilter() {
        setIsLoading(true);
        let queryString = `?description=${description}&location=${location}&full_time=${fullTime}`
        let res = await axios.get(url.home + queryString);
        setJobList(res.data);
        setIsLoading(false);
    }

    async function handleLogout() {
        let cookies = new Cookies();
        let res = await axios.post(url.logout);
        console.log(res)
        if (res.data.loggedout) {
            cookies.remove('loggedin', { path: '/' });
        }
        window.location.reload();
    }

    const handleChangePage = (event, value) => {
        setPage(value);
    }

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
                        <Button className={classes.logoutButton} variant="contained" color="secondary" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            Search Job Description
                        </div>
                        <InputBase
                            placeholder="Job Description…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            Search Job Location
                        </div>
                        <InputBase
                            placeholder="Job Location…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            Full Time
                        </div>
                        <Switch
                            checked={fullTime}
                            onChange={(e) => setFullTime(e.target.checked)}
                            name="checkedA"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </div>
                    <div className={classes.search}>
                        <Button variant="contained" color="primary" onClick={handleFilter}>
                            Search
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>

            <div className={classes.jobList}>
                { !isLoading ? 
                    renderJobList() 
                    :  renderLoading() }
                <Pagination count={jobList ? Math.floor(jobList.length / pageSize) : 1} page={page} onChange={handleChangePage}/>
            </div>
        </div>
    );
}