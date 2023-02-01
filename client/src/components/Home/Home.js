import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import { Container, AppBar, Typography, Grow, Grid, Paper } from '@material-ui/core';
import Posts from '../Posts/Posts'
import Form from "../Forms/Form"
import Pagination from '../Pagination'
import useStyles from './styles';
const Home = () => {
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch();
    const classes = useStyles()

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch, currentId])
    return (
        <Grow in>
            <Container>
                <Grid container direction="column-reverse" justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper className={classes.pagination} elevation={6}>
                            <Pagination />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home