import React, {useState} from 'react';
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import TabList from '@material-ui/lab/TabList';
import Paper from "@material-ui/core/Paper";
import TabContext from '@material-ui/lab/TabContext';
import { makeStyles } from '@material-ui/core/styles';
import Searchtitle from "./Searchtitle";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}))
const Search = () => {
    const [tab, setTab] = useState('1');
    const classes = useStyles();
    
    const tabChange = (e:any, value:any) => {
        setTab(value);
    }
    return (
        <>
            <TabContext value={tab}>
                <Paper className={classes.paper}>
                    <TabList onChange={tabChange} aria-label="simple tabs example">
                        <Tab label="제목으로 검색" value="1" />
                        <Tab label="재료로 검색" value="2" />
                    </TabList>
                </Paper>
                <TabPanel value="1">
                    <Searchtitle />
                </TabPanel>
                <TabPanel value="2">
                    {/* <Searchneed /> */}
                </TabPanel>
            </TabContext>
        </>
    )

}
export default Search;