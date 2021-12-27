import React from "react";
import styled from "styled-components";
import Button from 'react-bootstrap/Button';



const FilterAreaNm = ({ onFilter }) => (
    <>
        <Button name="서울" type="button" onChange={onFilter} placeholder="서울" />
        <Button name="부산" type="button" />
        <Button name="대구" />
        <Button name="인천" />
        <Button name="광주" />
        <Button name="대전" />
        <Button name="울산" />
        <Button name="세종" />
        <Button name="경기" />
        <Button name="강원" />
        <Button name="충북" />
        <Button name="충남" />
        <Button name="전북" />
        <Button name="전남" />
        <Button name="경북" />
        <Button name="경남" />
        <Button name="제주" />
    </>
);

export default FilterAreaNm;
