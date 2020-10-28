import React, { useState, useEffect } from 'react';
import { auth, db } from '../../config'
import Header from './Header';
import { loadNick } from '../../modules/userControl';
import { RootState } from '../../modules';
import { useSelector, useDispatch } from 'react-redux';

const HeaderContainer = (props: any) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const nickname = useSelector((state: RootState) => state.userControl.nickname);
    const dispatch = useDispatch();

    useEffect(() => {
        if (nickname === '') {
            auth.onAuthStateChanged(user => {
                if (user) {
                    dispatch(loadNick(user.displayName!));
                }
                else {
                    dispatch(loadNick(''));
                }
            })
        }
    }, [])

    const handleclick = (e: any) => {
        setAnchorEl(e.currentTarget)
    }
    const handleclose = () => {
        setAnchorEl(null);
    }
    const logout = () => {
        auth.signOut().then(() => {
            handleclose();
            props.history.push('/board')
        })
    }
    return (
        <>
            <Header
                nickname={nickname}
                handleclick={handleclick}
                anchorEl={anchorEl}
                handleclose={handleclose}
                logout={logout}

            />
        </>
    )
}

export default HeaderContainer;