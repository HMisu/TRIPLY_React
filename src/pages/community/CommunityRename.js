import Input from "../../components/ui/lnput/Input";
import "../../scss/pages/community/CommunityRename.scss"
import Tag from "../../components/ui/Tag";
import React from "react";
import Button from "../../components/ui/button/Button";

const CommunityRename= () => {
    return (
        <div className="community_rename">
            <div className="community_container">
                <div className="input-container">
                    <Input placeholder={"커뮤니티 명"} label={"커뮤니티명"} labelClassName="label-name"></Input>
                </div>
                <div className="input-container">
                    <Input placeholder={"#강원도"} label={"태그"} labelClassName="label-name"></Input>
                </div>
                <div className="tag-container">
                    <Tag color={'blue'} text={'#검색'}></Tag>
                    <Tag color={'blue'} text={'#검색'}></Tag>
                    <Tag color={'blue'} text={'#검색'}></Tag>
                    <Tag color={'blue'} text={'#검색'}></Tag>
                </div>
                <div className="upload-container">
                    <img className="image_upload_icon" src={process.env.PUBLIC_URL + '/assets/icons/image_upload.svg'}
                                alt=''/>
                    <label for="imageInput" id="uploadButton">대표이미지</label>
                    {/* <input type="file" id="imageInput" accept="image/*"></input> */}
                </div>
                <textarea className="Rename_text-input" placeholder="모임 목표를 설정해주세요" ></textarea>
                <div className="input-footer-container">
                    <div className="people_content">
                        <img className="icon" src={process.env.PUBLIC_URL + '/assets/icons/friend_gray.svg'}
                            alt=''/>
                        <p className="frend_icon_text">정원(0~300)</p>
                    </div>
                    <div className="people_container">
                        <Input placeholder={"인원수 입력"}></Input>
                    </div>
                </div>
                <div className="button-footer-container">
                    <Button type={'submit'} color={'green'} text={'커뮤니티개설'}/>
                </div>
            </div>


        </div>
    );
}

export default CommunityRename;