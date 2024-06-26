import React, {useEffect, useRef, useState} from 'react';
import '../../../scss/Header.scss';
import {useLocation, useNavigate} from 'react-router-dom';
import ToggleMenu from '../ToggleMenu';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { signout } from '../../../apis/userApi';

const Header = () => {
    const navi = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const logoColor = isHomePage ? 'white' : 'color';
    const iconColor = isHomePage ? 'white' : 'black';
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.userSlice.isLogin);

    const [menuOpen, setMenuOpen] = useState(false);
    const anchorRef = useRef(null);
    const toggleMenu = () => {
        setMenuOpen((prevOpen) => !prevOpen);
    };

    const items = [
        {label: 'Item 1', onClick: () => console.log('Item 1 selected')},
        {label: 'Item 2', onClick: () => console.log('Item 2 selected')},
        {label: 'Item 3', onClick: () => console.log('Item 3 selected')},
        {label: 'Item 4', onClick: () => console.log('Item 4 selected')},
        {label: 'Item 5', onClick: () => console.log('Item 5 selected')},
        {label: 'Item 6', onClick: () => console.log('Item 6 selected')},
        {label: 'Item 7', onClick: () => console.log('Item 7 selected')}
    ];

    const useTitle = () => {
        const pathName = location.pathname;

        switch (pathName) {
            case '/chat':
                return '채팅';
            case '/alarm':
                return '알림';
            case '/search':
                return '검색';
            case '/mypage':
                return '마이페이지';
            case '/user/sign-in':
                return '로그인';
            case '/user/sign-up':
                return '회원가입';
            default:
                return '';
        }
    }

    const signoutHandler = () => {
        dispatch(signout());
        navi('/');
      };

    return (
        <div className='Header'>
            <div className='logo'>
                <img src={process.env.PUBLIC_URL + `/logo_${logoColor}.png`} alt='로고'/>
            </div>
            <div className='title'>
                {useTitle()}
            </div>
            <div className="icon-wrapper">
                {isLogin ? (
                    <>
                        <div className='logout' onClick={signoutHandler}>
                            <img className='img' src={process.env.PUBLIC_URL + `/assets/icons/logout_${iconColor}.png`} alt='로그아웃 아이콘'/>
                        </div>        
                    </>
                ) : (
                    <div className='login' onClick={() => navi('/user/sign-in')}>
                        <img className='img' src={process.env.PUBLIC_URL + `/assets/icons/login_${iconColor}.svg`}
                             alt='로그인 아이콘'/>
                    </div>
                )}
                <ToggleMenu
                    items={items}
                    anchorEl={anchorRef.current}
                    open={menuOpen}
                    onClose={() => setMenuOpen(false)}
                />
            </div>
        </div>
    );
}

export default Header;