import React, {useEffect, useState} from 'react'
import Input from '../../components/ui/lnput/Input.js';
import {useForm} from 'react-hook-form';
import Button from "../../components/ui/button/Button";
import '../../scss/pages/sign/Sign.scss';
import {Grid} from '@mui/material';
import FullWidthButton from "../../components/ui/button/FullWidthButton";
import '../../scss/ui/Tag.scss';
import SelectBox from '../../components/ui/SelectBox';
import {signup} from '../../apis/userApi.js';
import {useDispatch} from 'react-redux';
import axios from 'axios';

function SignUp() {

    const [idCheck, setIdCheck] = useState(false);
    const [idChecked, setIdChecked] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [nicknameCheck, setNicknameCheck] = useState(false);
    const [nicknameChecked, setNicknameChecked] = useState(false);
    const [tags, setTags] = useState([]);
    const [province, setProvince] = useState(null);
    const [city, setCity] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthdayError, setBirthdayError] = useState('');
    const [areas, setAreas] = useState([]);
    const [cities, setCities] = useState([]);

    const dispatch = useDispatch();

    const {
        register,
        watch,
        formState: {errors},
        handleSubmit,
        getValues,
        setError,
        clearErrors,
    } = useForm({
        mode: "onChange"

    });

    const password = watch('password', '');
    const passwordCheck = watch('passwordCheck', '');
    const [passwordMatch, setPasswordMatch] = useState(false);

    useEffect(() => {
        if (year && month && day) {
            setBirthdayError('');
        }
    }, [year, month, day]);

    useEffect(() => {
        axios.get('http://localhost:9090/user/areas')
            .then(response => {
                setAreas(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the area data!", error);
            });
    }, []);

    const handleProvinceChange = (selectedOption) => {
        const selectedArea = areas.find(area => area.name === selectedOption.value);
        setProvince(selectedArea);
        const cityNames = selectedArea ? selectedArea.sigunguCodes.map(sigungu => sigungu.name) : [];
        setCities(cityNames);
        setCity('');
    };

    const API_URL = "http://localhost:9090";

    const handleIdCheck = async (id) => {
        if (!id) {
            setError('id', {
                color: 'red',
                type: 'required',
                message: '아이디를 입력해주세요',
            });
            setIdCheck(false);
            setIdChecked(true);
            return;
        }

        try {
            const response = await axios.get(`${API_URL}/user/check-userid?userid=${id}`);
            const {item} = response.data;
            if (item && item.available) {
                clearErrors('id');
                setIdCheck(true);
                setIdChecked(true);
            } else {
                setError('id', {
                    color: 'red',
                    type: 'id-duplicate',
                    message: '이미 사용 중인 아이디입니다',
                });
                setIdCheck(false);
            }
            setIdChecked(true);
        } catch (error) {
            console.error('ID 중복 확인 실패:', error);
        }
    };

    const handleNicknameCheck = async (nickname) => {
        if (!nickname) {
            setError('nickname', {
                color: 'red',
                type: 'required',
                message: '닉네임을 입력해주세요',
            });
            setNicknameCheck(false);
            setNicknameChecked(true);
            return;
        }

        try {
            const response = await axios.get(`${API_URL}/user/check-username?username=${nickname}`);
            const {item} = response.data;
            if (item && item.available) {
                clearErrors('nickname');
                setNicknameCheck(true);
                setNicknameChecked(true);
            } else {
                setError('nickname', {
                    color: 'red',
                    type: 'nickname-duplicate',
                    message: '사용할 수 없는 닉네임입니다',
                });
                setNicknameCheck(false);
            }
            setNicknameChecked(true);
        } catch (error) {
            console.error('닉네임 중복 확인 실패:', error);
        }
    };

    const handleTagInput = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (tags.length < 5) {
                setTags([...tags, e.target.value]);
                e.target.value = '';
            }
        }
    };

    const handleTagRemove = (index) => {
        setTags(tags.filter((tag, i) => i !== index));
    };

    const handleSignUp = async (data) => {
        if (!year || !month || !day) {
            setBirthdayError('생년월일은 필수 입력입니다.');
            return;
        }
        const selectedArea = areas.find(area => area.name === province?.name);
        const selectedSigungu = selectedArea?.sigunguCodes.find(sigungu => sigungu.name === city);

        const user = {
            userId: data.id,
            userPw: data.password,
            userName: data.nickname,
            tags: tags,
            areaCode: selectedArea?.code || '',
            areaName: selectedArea?.name || '',
            sigunguCode: selectedSigungu?.code || '',
            sigunguName: selectedSigungu?.name || '',
            userBirth: `${year.value}-${month.value < 10 ? '0' + month.value : month.value}-${day.value < 10 ? '0' + day.value : day.value}T00:00:00`,
            userTel: phoneNumber,
        };

        try {
            dispatch(signup(user));
        } catch (error) {
            console.error("Sign up failed:", error);
        }
    };


    useEffect(() => {
        setPasswordMatch(password === passwordCheck && password !== '');
    }, [password, passwordCheck]);

    useEffect(() => {
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        setValidPassword(passwordPattern.test(password));
    }, [password]);

    const years = Array.from({length: 100}, (_, i) => new Date().getFullYear() - i);
    const months = Array.from({length: 12}, (_, i) => i + 1);
    const days = Array.from({length: 31}, (_, i) => i + 1);

    const handleCityChange = (selectedOption) => {
        const selectedCity = selectedOption.value;
        const selectedSigungu = province?.sigunguCodes.find(sigungu => sigungu.name === selectedCity);
        setCity(selectedCity);
    };

    const handleYearChange = (value) => {
        setYear(value);
    };

    const handleMonthChange = (value) => {
        setMonth(value);
    };

    const handleDayChange = (value) => {
        setDay(value);
    };

    const handlePhoneNumberChange = (event) => {
        const {value} = event.target;
        const formattedValue = value.replace(/\D/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        setPhoneNumber(formattedValue);
    };

    return (
        <div className="SignUp">
            <form id="form-sign-up" onSubmit={handleSubmit(handleSignUp)} className="signup-form">
                <div>
                    <p className="text-color">아이디</p>
                    <Grid container>
                        <Grid item xs={10}>
                            <Input type='id' name='id' placeholder='아이디를 입력해주세요'
                                   {...register('id', {
                                       required: '아이디를 입력해주세요',
                                       validate: value => {
                                           if (!idChecked && value !== '') return '중복 확인을 해주세요.';
                                           return true;
                                       }
                                   })} />
                        </Grid>
                        <Grid item container alignItems={'center'} xs={2}>
                            <Button color={"gray"} text={"중복확인"}
                                    onClick={() => handleIdCheck(getValues('id'))}></Button>
                        </Grid>
                        {!idChecked && <p className="error-message">{errors.id && errors.id.message}</p>}
                        {idChecked && idCheck && <p className="check-message">사용 가능한 아이디입니다.</p>}
                        {idChecked && !idCheck && <p className="error-message">이미 사용 중인 아이디입니다.</p>}
                    </Grid>
                    <br></br>
                    <Grid container>
                        <Grid item xs={10}>
                            <p className="text-color">비밀번호</p>
                            <Input type='password' id='password' name='password' placeholder='비밀번호를 입력해주세요'
                                   {...register('password', {
                                       required: '비밀번호는 필수 입력입니다.',
                                       pattern: {
                                           value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                                           message: '8~20자리의 영문자, 숫자, 특수문자를 사용해야 합니다.',
                                       },
                                   })}
                            />
                            {errors.password && !validPassword && <span>{errors.password.message}</span>}
                        </Grid>
                    </Grid>
                    <br></br>
                    <Grid container>
                        <Grid item xs={10}>
                            <p className="text-color">비밀번호 확인</p>
                            <Input type='password' id='passwordCheck' name='passwordCheck'
                                   placeholder='비밀번호를 다시 한번 입력해주세요'
                                   {...register('passwordCheck', {
                                       required: '비밀번호 확인은 필수 입력입니다.',
                                       validate: (value) =>
                                           value === password || '비밀번호가 일치하지 않습니다.',
                                   })}
                            />
                        </Grid>
                        {errors.passwordCheck && <span className="error-message">{errors.passwordCheck.message}</span>}
                        {passwordMatch && <span className="check-message">비밀번호가 일치합니다.</span>}
                    </Grid>
                    <br></br>
                    <Grid container>
                        <Grid item xs={12}>
                            <p className="text-color">닉네임</p>
                        </Grid>
                        <Grid item xs={10}>
                            <Input
                                type='nickname'
                                name='nickname'
                                placeholder='닉네임을 입력해주세요'
                                {...register('nickname', {
                                    required: '닉네임을 입력해주세요',
                                    validate: value => {
                                        if (!nicknameChecked && value !== '') return '중복 확인을 해주세요.';
                                        return true;
                                    }
                                })}
                            />
                        </Grid>
                        <Grid item container alignItems={'center'} xs={2}>
                            <Button color={"gray"} text={"중복확인"}
                                    onClick={() => handleNicknameCheck(getValues('nickname'))}></Button>
                        </Grid>
                        {!nicknameChecked &&
                            <p className="error-message">{errors.nickname && errors.nickname.message}</p>}
                        {nicknameChecked && nicknameCheck && <p className="check-message">사용 가능한 닉네임입니다.</p>}
                        {nicknameChecked && !nicknameCheck && <p className="error-message">사용할 수 없는 닉네임입니다.</p>}
                    </Grid>
                    <br></br>
                    <Grid container>
                        <Grid item xs={10}>
                            <p className="text-color">태그 추가 (최대 5개)</p>
                            <Input
                                type='text'
                                name='tags'
                                placeholder='태그를 입력하고 엔터를 눌러주세요'
                                onKeyDown={handleTagInput}
                            />
                        </Grid>
                    </Grid>
                    <br></br>
                    <div>
                        {tags.map((tag, index) => (
                            <span key={index} className="Tag tag-color-blue">
                {tag}
                                <span onClick={() => handleTagRemove(index)}>&times;</span>
              </span>
                        ))}
                    </div>
                    <br></br>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <p className="text-color">지역 선택</p>
                            <SelectBox
                                options={areas.map(area => area.name)}
                                value={province}
                                onSelectChange={handleProvinceChange}
                                placeholder={"도 선택"}
                                fontSize="14px"
                                height={40}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <p className="text-color">&nbsp;</p>
                            <SelectBox
                                options={cities}
                                value={city}
                                onSelectChange={handleCityChange}
                                placeholder={"시 선택"}
                                fontSize="14px"
                                height={40}
                            />
                        </Grid>
                    </Grid>
                    <br></br>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <div className="SelectOptions">
                                <p className="text-color">생년월일</p>
                                <SelectBox
                                    options={years}
                                    value={year}
                                    onSelectChange={handleYearChange}
                                    placeholder="년도"
                                    fontSize="14px"
                                />
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className="SelectOptions">
                                <p className="text-color">&nbsp;</p>
                                <SelectBox
                                    options={months}
                                    value={month}
                                    onSelectChange={handleMonthChange}
                                    placeholder="월"
                                    fontSize="14px"
                                />
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className="SelectOptions">
                                <p className="text-color">&nbsp;</p>
                                <SelectBox
                                    options={days}
                                    value={day}
                                    onSelectChange={handleDayChange}
                                    placeholder="일"
                                    fontSize="14px"
                                />
                            </div>
                        </Grid>
                    </Grid>
                    {birthdayError && <p className="error-message">{birthdayError}</p>}
                    <br></br>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={10}>
                            <p className="text-color">휴대폰 번호</p>
                            <Input
                                type="text"
                                name="phoneNumber"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                placeholder="010-0000-0000"
                            />
                        </Grid>
                    </Grid>
                    <br></br>
                    <Grid container>
                        <Grid item xs={10}>
                            <FullWidthButton color={'green'} text={'가입 완료'} type="submit"
                                             disabled={!year || !month || !day || !province || !city}/>
                        </Grid>
                    </Grid>
                </div>
            </form>
        </div>
    )
}


export default SignUp

